import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ darkMode, onToggle }: ThemeToggleProps) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
  >
    {darkMode ? (
      <Sun className="text-yellow-500" size={24} />
    ) : (
      <Moon className="text-purple-600" size={24} />
    )}
  </motion.button>
);