import React from 'react';
import { Home, Grid, User, HelpCircle, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const MobileNavbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/categories', icon: Grid, label: 'Categories' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/account', icon: User, label: 'Account' },
    { path: '/help', icon: HelpCircle, label: 'Help' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 md:hidden">
      <div className="flex justify-around items-center py-3">
        {navItems.map(({ path, icon: Icon, label }) => (
          <motion.div
            key={path}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={path}
              className={`flex flex-col items-center ${
                location.pathname === path ? 'text-pink-600' : 'text-purple-600'
              } dark:text-purple-400`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};