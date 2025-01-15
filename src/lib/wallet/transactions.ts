import { supabase } from '../supabase';
import { WalletTransaction } from './types';

export const recordTransaction = async (transaction: Omit<WalletTransaction, 'timestamp'>) => {
  const { error } = await supabase
    .from('wallet_transactions')
    .insert({
      ...transaction,
      timestamp: new Date().toISOString()
    });

  if (error) throw error;
};

export const getTransactionHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallet_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  if (error) throw error;
  return data as (WalletTransaction & { id: string })[];
};