import { supabase } from '../supabase';
import { generateTransferCode } from '../../utils/wallet';
import { TokenTransfer } from './types';
import { recordTransaction } from './transactions';

export const initiateTokenTransfer = async (fromUserId: string, amount: number) => {
  const { data: wallet, error: walletError } = await supabase
    .from('wallets')
    .select('coins')
    .eq('user_id', fromUserId)
    .single();
  
  if (walletError) throw walletError;
  if (!wallet || wallet.coins < amount) throw new Error("Insufficient coins");

  const transferCode = generateTransferCode();
  
  const { error: transferError } = await supabase
    .from('token_transfers')
    .insert({
      from_user_id: fromUserId,
      amount,
      transfer_code: transferCode,
      status: 'pending'
    });

  if (transferError) throw transferError;
  return transferCode;
};

export const completeTokenTransfer = async (transferCode: string, toUserId: string) => {
  const { data: transfer, error: transferError } = await supabase
    .from('token_transfers')
    .select('*')
    .eq('transfer_code', transferCode)
    .eq('status', 'pending')
    .single();

  if (transferError) throw new Error('Invalid or expired transfer code');
  if (transfer.from_user_id === toUserId) {
    throw new Error('Cannot transfer tokens to yourself');
  }

  // Update sender's wallet
  const { data: fromWallet, error: fromWalletError } = await supabase
    .from('wallets')
    .select('coins')
    .eq('user_id', transfer.from_user_id)
    .single();

  if (fromWalletError) throw fromWalletError;
  if (fromWallet.coins < transfer.amount) throw new Error('Insufficient coins');

  const { error: updateFromError } = await supabase
    .from('wallets')
    .update({
      coins: fromWallet.coins - transfer.amount,
      last_updated: new Date().toISOString()
    })
    .eq('user_id', transfer.from_user_id);

  if (updateFromError) throw updateFromError;

  // Update recipient's wallet
  const { data: toWallet, error: toWalletError } = await supabase
    .from('wallets')
    .select('coins')
    .eq('user_id', toUserId)
    .single();

  if (toWalletError && toWalletError.code !== 'PGRST116') throw toWalletError;

  const currentCoins = toWallet?.coins || 0;
  const { error: updateToError } = await supabase
    .from('wallets')
    .upsert({
      user_id: toUserId,
      coins: currentCoins + transfer.amount,
      last_updated: new Date().toISOString()
    });

  if (updateToError) throw updateToError;

  // Update transfer status
  const { error: completeError } = await supabase
    .from('token_transfers')
    .update({
      to_user_id: toUserId,
      status: 'completed'
    })
    .eq('transfer_code', transferCode);

  if (completeError) throw completeError;

  // Record transactions
  await Promise.all([
    recordTransaction({
      user_id: transfer.from_user_id,
      amount: transfer.amount,
      type: 'transfer',
      status: 'completed',
      transfer_code: transferCode,
      recipient_id: toUserId
    }),
    recordTransaction({
      user_id: toUserId,
      amount: transfer.amount,
      type: 'transfer',
      status: 'completed',
      transfer_code: transferCode,
      recipient_id: transfer.from_user_id
    })
  ]);

  return true;
};