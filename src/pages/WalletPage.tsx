import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpCircle, ArrowDownCircle, RefreshCw, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getWalletBalance, addFunds, withdrawFunds, loadWalletFromBank } from '../lib/wallet';
import { formatNaira } from '../utils/currency';

export const WalletPage = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'balance' | 'deposit' | 'withdraw' | 'load'>('balance');
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    bankName: ''
  });

  const fetchBalance = async () => {
    if (!user) return;
    try {
      const walletData = await getWalletBalance(user.id);
      setBalance(walletData.balance);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);

  const handleTransaction = async () => {
    if (!user || !amount) return;
    setLoading(true);
    try {
      switch (activeTab) {
        case 'deposit':
          await addFunds(user.id, Number(amount));
          break;
        case 'withdraw':
          await withdrawFunds(user.id, Number(amount));
          break;
        case 'load':
          if (!bankDetails.accountNumber || !bankDetails.bankName) {
            throw new Error('Please fill in all bank details');
          }
          await loadWalletFromBank(user.id, Number(amount), bankDetails);
          break;
      }
      await fetchBalance();
      setAmount('');
      setBankDetails({ accountNumber: '', bankName: '' });
    } catch (error) {
      console.error('Transaction error:', error);
      alert(error instanceof Error ? error.message : 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        Please sign in to access your wallet
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold">My Wallet</h2>
          </div>
          <button
            onClick={fetchBalance}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            onClick={() => setActiveTab('balance')}
            className={`py-2 px-4 rounded-lg flex items-center justify-center gap-2
              ${activeTab === 'balance' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            <Wallet size={20} />
            Check Balance
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`py-2 px-4 rounded-lg flex items-center justify-center gap-2
              ${activeTab === 'deposit' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            <ArrowUpCircle size={20} />
            Deposit
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`py-2 px-4 rounded-lg flex items-center justify-center gap-2
              ${activeTab === 'withdraw' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            <ArrowDownCircle size={20} />
            Withdraw
          </button>
          <button
            onClick={() => setActiveTab('load')}
            className={`py-2 px-4 rounded-lg flex items-center justify-center gap-2
              ${activeTab === 'load' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            <CreditCard size={20} />
            Load Wallet
          </button>
        </div>

        {activeTab === 'balance' ? (
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Balance</p>
            <p className="text-3xl font-bold text-purple-600">{formatNaira(balance)}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount ({activeTab === 'deposit' ? 'to deposit' : activeTab === 'withdraw' ? 'to withdraw' : 'to load'})
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                placeholder="Enter amount"
                min="0"
              />
            </div>

            {activeTab === 'load' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                    placeholder="Enter bank name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Account Number</label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                    placeholder="Enter account number"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleTransaction}
              disabled={loading || !amount || (activeTab === 'load' && (!bankDetails.accountNumber || !bankDetails.bankName))}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                       text-white py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Processing...' : activeTab === 'deposit' ? 'Deposit' : activeTab === 'withdraw' ? 'Withdraw' : 'Load Wallet'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};