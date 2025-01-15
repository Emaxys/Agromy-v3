import { supabase } from '../supabase';
import { recordTransaction } from './transactions';

// Add new function for loading wallet from bank
export const loadWalletFromBank = async (userId: string, amount: number, bankDetails: {
  accountNumber: string;
  bankName: string;
}) => {
  if (amount <= 0) throw new Error('Amount must be greater than 0');

  // Simulate bank API call (in real app, integrate with actual payment gateway)
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { data: wallet, error: walletError } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (walletError) throw walletError;

  const { error: updateError } = await supabase
    .from('wallets')
    .update({
      balance: (wallet.balance || 0) + amount,
      last_updated: new Date().toISOString()
    })
    .eq('user_id', userId);

  if (updateError) throw updateError;

  await recordTransaction({
    user_id: userId,
    amount,
    type: 'deposit',
    status: 'completed',
    bank_details: bankDetails
  });

  return { success: true, newBalance: (wallet.balance || 0) + amount };
};