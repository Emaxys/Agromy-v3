import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserOrders } from '../../lib/orders';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const orderData = await getUserOrders(user.id);
          setOrders(orderData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};