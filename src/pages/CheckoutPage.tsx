import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShippingOptions } from '../components/shipping/ShippingOptions';
import { useAuth } from '../hooks/useAuth';
import { createOrder } from '../lib/orders';
import { getWalletBalance, useWalletForPurchase } from '../lib/wallet';
import { motion } from 'framer-motion';
import { formatNaira } from '../utils/currency';
import { CreditCard, Wallet, Truck } from 'lucide-react';

export const CheckoutPage = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [selectedShipping, setSelectedShipping] = useState('free');
  const { user } = useAuth();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = selectedShipping === 'free' ? 0 : 
                      selectedShipping === 'express' ? 2000 : 5000;
  const total = subtotal + shippingCost;

  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (user) {
        try {
          const wallet = await getWalletBalance(user.id);
          setWalletBalance(wallet.balance);
        } catch (error) {
          console.error('Error fetching wallet balance:', error);
        }
      }
    };
    fetchWalletBalance();
  }, [user]);

  const handlePayment = async (method: 'wallet' | 'card') => {
    setLoading(true);
    try {
      if (!user) {
        navigate('/account');
        return;
      }

      if (method === 'wallet') {
        await useWalletForPurchase(user.id, total);
      }

      const order = await createOrder(user.id, cart, total);
      clearCart();
      navigate(`/orders/${order}`);
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <ShippingOptions
              selectedOption={selectedShipping}
              onSelect={setSelectedShipping}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : formatNaira(shippingCost)}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {walletBalance !== null && walletBalance >= total && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePayment('wallet')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 
                         disabled:bg-gray-400 text-white py-3 px-4 rounded-lg transition-colors"
              >
                <Wallet size={20} />
                {loading ? 'Processing...' : 'Pay with Wallet'}
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePayment('card')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 
                       disabled:bg-gray-400 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <CreditCard size={20} />
              {loading ? 'Processing...' : 'Pay with Card'}
            </motion.button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white dark:bg-gray-800 text-sm text-gray-500">Or</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/pay-on-delivery')}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 
                       text-white py-3 px-4 rounded-lg transition-colors"
            >
              <Truck size={20} />
              Pay on Delivery
            </motion.button>

            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-400 text-center">
                Pay on delivery includes a ₦500 handling fee
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};