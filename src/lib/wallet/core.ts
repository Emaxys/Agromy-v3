import { supabase } from '../supabase';
import { WalletData } from './types';

export const initializeWallet = async (userId: string) => {
  const { error } = await supabase
    .from('wallets')
    .insert({
      user_id: userId,
      balance: 0,
      coins: 0
    });

  if (error) throw error;
};

export const getWalletBalance = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      await initializeWallet(userId);
      return { balance: 0, coins: 0, last_updated: new Date().toISOString() };
    }
    throw error;
  }

  return data as WalletData;
};