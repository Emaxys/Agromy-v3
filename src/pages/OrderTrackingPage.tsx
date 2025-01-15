import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getUserOrders } from '../lib/orders';
import { formatNaira } from '../utils/currency';

interface OrderStatus {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  total_amount: number;
  tracking_number?: string;
}

const statusColors = {
  pending: 'text-yellow-500',
  processing: 'text-blue-500',
  shipped: 'text-purple-500',
  delivered: 'text-green-500',
  cancelled: 'text-red-500',
};

const StatusIcon = ({ status }: { status: OrderStatus['status'] }) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="text-green-500" />;
    case 'cancelled':
      return <XCircle className="text-red-500" />;
    default:
      return <Clock className="text-yellow-500" />;
  }
};

export const OrderTrackingPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const userOrders = await getUserOrders(user.uid);
        setOrders(userOrders as OrderStatus[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h1 className="text-2xl font-bold mb-6">Track Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Package size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                  <p className="font-semibold">{formatNaira(order.total_amount)}</p>
                </div>
                <StatusIcon status={order.status} />
              </div>
              
              <div className="relative">
                <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-6 relative">
                  {['pending', 'processing', 'shipped', 'delivered'].map((step, index) => (
                    <div
                      key={step}
                      className={`flex items-center gap-4 ${
                        order.status === 'cancelled' && step !== 'cancelled'
                          ? 'opacity-50'
                          : ''
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full ${
                          order.status === step
                            ? statusColors[order.status]
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                      <div>
                        <p className="font-medium capitalize">{step}</p>
                        <p className="text-sm text-gray-500">
                          {order.status === step
                            ? 'Current status'
                            : index < ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status)
                            ? 'Completed'
                            : 'Pending'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};