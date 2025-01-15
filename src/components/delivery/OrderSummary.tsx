import React from 'react';
import { CartItem } from '../../types';
import { formatNaira } from '../../utils/currency';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const OrderSummary = ({ items, subtotal, deliveryFee, total }: OrderSummaryProps) => (
  <div>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>{formatNaira(item.price * item.quantity)}</span>
          </div>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Delivery Fee</span>
            <span>{formatNaira(deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>{formatNaira(total)}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
      <p className="text-sm text-yellow-800 dark:text-yellow-200">
        Payment will be collected upon delivery. Please have the exact amount ready.
      </p>
    </div>
  </div>
);