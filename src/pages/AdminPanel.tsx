import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { isAdmin, getAllOrders } from '../lib/admin';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  user_id: string;
}

export const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminAndFetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const adminStatus = await isAdmin(user.id);
      setIsAdminUser(adminStatus);

      if (adminStatus) {
        const ordersData = await getAllOrders();
        setOrders(ordersData as Order[]);
      }
      
      setLoading(false);
    };

    checkAdminAndFetchOrders();
  }, [user]);

  if (!isAdminUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">User ID</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b dark:border-gray-700">
                  <td className="p-4">{order.id.slice(0, 8)}</td>
                  <td className="p-4">{order.user_id}</td>
                  <td className="p-4">${order.total_amount.toFixed(2)}</td>
                  <td className="p-4">{order.status}</td>
                  <td className="p-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};