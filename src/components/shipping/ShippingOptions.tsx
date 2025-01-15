import React from 'react';
import { Truck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

const shippingOptions: ShippingOption[] = [
  {
    id: 'free',
    name: 'Free Shipping',
    price: 0,
    duration: '5-7 business days',
    description: 'Standard delivery with no additional cost'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 2000,
    duration: '2-3 business days',
    description: 'Faster delivery for urgent orders'
  },
  {
    id: 'same-day',
    name: 'Same Day Delivery',
    price: 5000,
    duration: 'Today',
    description: 'Available for select locations within the city'
  }
];

interface ShippingOptionsProps {
  selectedOption: string;
  onSelect: (optionId: string) => void;
}

export const ShippingOptions = ({ selectedOption, onSelect }: ShippingOptionsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
      {shippingOptions.map((option) => (
        <motion.div
          key={option.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option.id)}
          className={`cursor-pointer p-4 rounded-lg border-2 transition-colors
            ${selectedOption === option.id
              ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
              : 'border-gray-200 dark:border-gray-700'}`}
        >
          <div className="flex items-center gap-4">
            {option.id === 'free' ? (
              <Truck className="text-purple-600" size={24} />
            ) : (
              <Zap className="text-purple-600" size={24} />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium">{option.name}</h4>
                <span className="font-semibold">
                  {option.price === 0 ? 'FREE' : `₦${option.price.toLocaleString()}`}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Estimated delivery: {option.duration}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {option.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};