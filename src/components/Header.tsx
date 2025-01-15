import React from 'react';
import { ShoppingCart, User, Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from './navigation/ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { getWalletBalance } from '../lib/wallet';
import { formatNaira } from '../utils/currency';

export const Header = () => {
  const { darkMode, toggleDarkMode, cart } = useStore();
  const [walletBalance, setWalletBalance] = React.useState<number | null>(null);
  const { user } = useAuth();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  React.useEffect(() => {
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

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md h-14"
    >
      <div className="max-w-7xl mx-auto px-2 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent shrink-0">
            FoodMart
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm absolute left-1/2 transform -translate-x-1/2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            {user && <NavLink to="/wallet">Wallet</NavLink>}
            <NavLink to="/help">Help</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {user && walletBalance !== null && (
              <div className="text-xs font-medium text-purple-600 dark:text-purple-400">
                {formatNaira(walletBalance)}
              </div>
            )}

            <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link to="/cart">
                <ShoppingCart className="text-purple-600 dark:text-purple-400" size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </motion.div>

            {user ? (
              <Link to="/account" className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
                  {user.email?.[0].toUpperCase()}
                </div>
              </Link>
            ) : (
              <Link to="/account" className="flex items-center gap-1 text-purple-600">
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
  >
    {children}
  </Link>
);