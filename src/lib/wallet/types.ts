export interface WalletData {
  balance: number;
  coins: number;
  lastUpdated: string;
}

export interface WalletTransaction {
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'conversion' | 'purchase' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  coinsReceived?: number;
  transferCode?: string;
  recipientId?: string;
}

export interface TokenTransfer {
  fromUserId: string;
  toUserId: string;
  amount: number;
  transferCode: string;
  status: 'pending' | 'completed' | 'cancelled';
  timestamp: string;
}