import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, RefreshCcw, ShoppingCart } from 'lucide-react';
import { WalletTransaction } from '../../lib/wallet/types';
import { formatNaira } from '../../utils/currency';

interface TransactionHistoryProps {
  transactions: (WalletTransaction & { id: string })[];
}

const TransactionIcon = ({ type }: { type: WalletTransaction['type'] }) => {
  switch (type) {
    case 'deposit':
      return <ArrowUpRight className="text-green-500" />;
    case 'withdrawal':
      return <ArrowDownRight className="text-red-500" />;
    case 'conversion':
      return <RefreshCcw className="text-blue-500" />;
    case 'purchase':
      return <ShoppingCart className="text-purple-500" />;
  }
};

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="flex items-center gap-3">
              <TransactionIcon type={transaction.type} />
              <div>
                <p className="font-medium capitalize">{transaction.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {transaction.type === 'deposit' ? '+' : '-'} {formatNaira(transaction.amount)}
              </p>
              {transaction.coinsReceived && (
                <p className="text-sm text-yellow-500">
                  +{transaction.coinsReceived} coins
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}