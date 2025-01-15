export interface WalletTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'purchase';
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface UserWallet {
  id: string;
  user_id: string;
  balance: number;
  coins: number;
  last_updated: string;
}