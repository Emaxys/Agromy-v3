import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  text: string;
}

export const NavLink = ({ to, icon: Icon, text }: NavLinkProps) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <Link to={to} className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700">
      <Icon size={20} />
      <span>{text}</span>
    </Link>
  </motion.div>
);