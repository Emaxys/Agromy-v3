import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse our products, add items to your cart, and proceed to checkout. You\'ll need to sign in or create an account to complete your purchase.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and digital wallets for secure payments.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 2-3 business days. Express delivery (1-2 days) is available for select locations.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 14 days of purchase. Items must be unused and in original packaging.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to most countries. International shipping times and rates vary by location.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email to monitor your delivery.'
  },
  {
    question: 'Are your products organic?',
    answer: 'Many of our products are certified organic. Look for the organic label in product descriptions.'
  },
  {
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer discounts for bulk orders. Contact our support team for details.'
  }
];

export const FAQ = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="font-medium text-lg mb-2 text-purple-600 dark:text-purple-400">
              {faq.question}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};