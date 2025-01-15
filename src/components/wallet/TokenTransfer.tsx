import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { initiateTokenTransfer, completeTokenTransfer } from '../../lib/wallet/transfers';
import { useAuth } from '../../hooks/useAuth';

interface TokenTransferProps {
  onComplete: () => void;
}

export const TokenTransfer = ({ onComplete }: TokenTransferProps) => {
  const [amount, setAmount] = useState('');
  const [transferCode, setTransferCode] = useState('');
  const [mode, setMode] = useState<'send' | 'receive'>('send');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSendTokens = async () => {
    if (!user || !amount) return;
    setLoading(true);
    try {
      const code = await initiateTokenTransfer(user.uid, Number(amount));
      setTransferCode(code);
      onComplete();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error sending tokens');
    } finally {
      setLoading(false);
    }
  };

  const handleReceiveTokens = async () => {
    if (!user || !transferCode) return;
    setLoading(true);
    try {
      await completeTokenTransfer(transferCode, user.uid);
      onComplete();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error receiving tokens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Send className="text-purple-600" size={24} />
        <h2 className="text-xl font-semibold">Token Transfer</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('send')}
          className={`flex-1 py-2 px-4 rounded-lg
            ${mode === 'send' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
        >
          Send
        </button>
        <button
          onClick={() => setMode('receive')}
          className={`flex-1 py-2 px-4 rounded-lg
            ${mode === 'receive' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
        >
          Receive
        </button>
      </div>

      {mode === 'send' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount (coins)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              placeholder="Enter amount of coins to send"
            />
          </div>
          <button
            onClick={handleSendTokens}
            disabled={loading || !amount}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                     text-white py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Processing...' : 'Generate Transfer Code'}
          </button>
          {transferCode && (
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Transfer Code:</p>
              <p className="text-xl font-mono font-bold text-purple-600">{transferCode}</p>
              <p className="text-sm text-gray-500 mt-2">
                Share this code with the recipient to complete the transfer
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Transfer Code</label>
            <input
              type="text"
              value={transferCode}
              onChange={(e) => setTransferCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              placeholder="Enter transfer code"
            />
          </div>
          <button
            onClick={handleReceiveTokens}
            disabled={loading || !transferCode}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                     text-white py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Processing...' : 'Receive Tokens'}
          </button>
        </div>
      )}
    </div>
  );
};