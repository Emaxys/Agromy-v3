import React from 'react';
import { CreditCard, Wallet, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatNaira } from '../../utils/currency';

interface PaymentOptionsProps {
  total: number;
  walletBalance: number | null;
  loading: boolean;
  onWalletPayment: () => void;
  onCardPayment: () => void;
  onPayOnDelivery: () => void;
}

export const PaymentOptions = ({
  total,
  walletBalance,
  loading,
  onWalletPayment,
  onCardPayment,
  onPayOnDelivery
}: PaymentOptionsProps) => {
  return (
    <div className="space-y-4">
      {walletBalance !== null && walletBalance >= total && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onWalletPayment}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                   text-white py-3 px-4 rounded-lg transition-colors"
        >
          <Wallet size={20} />
          {loading ? 'Processing...' : 'Pay with Wallet'}
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCardPayment}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                 text-white py-3 px-4 rounded-lg transition-colors"
      >
        <CreditCard size={20} />
        {loading ? 'Processing...' : 'Pay with Card'}
      </motion.button>

      <div className="relative pt-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white dark:bg-gray-800 text-sm text-gray-500">
            Or
          </span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onPayOnDelivery}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 
                 text-white py-3 px-4 rounded-lg transition-colors"
      >
        <Truck size={20} />
        {loading ? 'Processing...' : `Pay on Delivery (${formatNaira(total + 500)})`}
      </motion.button>
      
      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-400 text-center">
          Pay on delivery includes a ₦500 handling fee
        </p>
      </div>
    </div>
  );
};