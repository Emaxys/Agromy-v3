import { supabase } from './supabase';

export const isAdmin = async (userId: string) => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error checking admin status:', error);
    return false;
  }

  return !!data;
};

export const getAllOrders = async () => {
  // First check if the user is an admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const isAdminUser = await isAdmin(user.id);
  if (!isAdminUser) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data;
};