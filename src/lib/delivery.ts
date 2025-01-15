import { supabase } from './supabase';

export const saveDeliveryAddress = async (userId: string, city: string, address: string) => {
  const { data, error } = await supabase
    .from('delivery_addresses')
    .insert({
      user_id: userId,
      city,
      address,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};