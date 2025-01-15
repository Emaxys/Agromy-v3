import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, MapPin } from 'lucide-react';

interface OrderStatusProps {
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
  estimatedDelivery: string;
}

const statusSteps = [
  { id: 'processing', icon: Package, label: 'Processing' },
  { id: 'shipped', icon: Truck, label: 'Shipped' },
  { id: 'out-for-delivery', icon: MapPin, label: 'Out for Delivery' },
  { id: 'delivered', icon: CheckCircle, label: 'Delivered' }
];

export const OrderStatus = ({ status, estimatedDelivery }: OrderStatusProps) => {
  const currentStepIndex = statusSteps.findIndex(step => step.id === status);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-6">Order Status</h3>
      
      <div className="relative">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
        
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center mb-8 last:mb-0"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCompleted ? '#9333ea' : '#e5e7eb'
                }}
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
              >
                <Icon
                  size={24}
                  className={isCompleted ? 'text-white' : 'text-gray-400'}
                />
              </motion.div>
              
              <div className="ml-4">
                <p className={`font-medium ${
                  isCompleted ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'
                }`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-sm text-gray-500">
                    Estimated delivery: {estimatedDelivery}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};