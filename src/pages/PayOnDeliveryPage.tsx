import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { createOrder } from '../lib/orders';
import { auth } from '../lib/supabase.ts';
import { DeliveryForm } from '../components/delivery/DeliveryForm';
import { OrderSummary } from '../components/delivery/OrderSummary';

export const PayOnDeliveryPage = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        navigate('/account');
        return;
      }

      const order = await createOrder(user.uid, cart, total);
      clearCart();
      navigate(`/orders/${order}`);
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-2xl font-bold mb-6">Pay on Delivery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DeliveryForm
          form={form}
          loading={loading}
          onSubmit={handleSubmit}
          onChange={handleFormChange}
        />
        <OrderSummary
          items={cart}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />
      </div>
    </motion.div>
  );
};