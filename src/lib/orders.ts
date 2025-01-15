import { supabase } from './supabase';
import { CartItem } from '../types';

export const createOrder = async (userId: string, items: CartItem[], totalAmount: number) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: totalAmount,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order.id;
};

export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getOrderDetails = async (orderId: string) => {
  const [orderResult, itemsResult] = await Promise.all([
    supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single(),
    supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
  ]);

  if (orderResult.error) throw orderResult.error;
  if (itemsResult.error) throw itemsResult.error;

  return {
    order: orderResult.data,
    items: itemsResult.data
  };
};