import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, RefreshCw, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { formatNaira } from '../../utils/currency';
import { addFunds, withdrawFunds, convertToCoins } from '../../lib/wallet';
import { useAuth } from '../../hooks/useAuth';

interface WalletCardProps {
  balance: number;
  coins: number;
  onUpdate: () => void;
}

export const WalletCard = ({ balance, coins, onUpdate }: WalletCardProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'convert'>('deposit');
  const { user } = useAuth();

  const handleAction = async () => {
    if (!user || !amount) return;
    setLoading(true);
    try {
      switch (activeTab) {
        case 'deposit':
          await addFunds(user.uid, Number(amount));
          break;
        case 'withdraw':
          await withdrawFunds(user.uid, Number(amount));
          break;
        case 'convert':
          await convertToCoins(user.uid, Number(amount));
          break;
      }
      onUpdate();
      setAmount('');
    } catch (error) {
      console.error('Error processing wallet action:', error);
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wallet className="text-purple-600" size={24} />
          <h2 className="text-xl font-semibold">My Wallet</h2>
        </div>
        <button
          onClick={onUpdate}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
          <p className="text-2xl font-bold text-purple-600">
            {formatNaira(balance)}
          </p>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Coins</p>
          <div className="flex items-center gap-2">
            <Coins className="text-yellow-600" size={20} />
            <p className="text-2xl font-bold text-yellow-600">{coins}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2
            ${activeTab === 'deposit' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700'}`}
        >
          <ArrowUpCircle size={20} />
          Deposit
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2
            ${activeTab === 'withdraw' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700'}`}
        >
          <ArrowDownCircle size={20} />
          Withdraw
        </button>
        <button
          onClick={() => setActiveTab('convert')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2
            ${activeTab === 'convert' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-700'}`}
        >
          <Coins size={20} />
          Convert
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Amount ({activeTab === 'convert' ? '₦100 = 1 coin' : '₦'})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
            placeholder={`Enter amount to ${activeTab}`}
          />
        </div>

        <button
          onClick={handleAction}
          disabled={loading || !amount}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                   text-white py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Processing...' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Now`}
        </button>
      </div>
    </motion.div>
  );
};