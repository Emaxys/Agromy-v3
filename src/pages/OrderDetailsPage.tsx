import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OrderMap } from '../components/tracking/OrderMap';
import { OrderStatus } from '../components/tracking/OrderStatus';
import { getOrderDetails } from '../lib/orders';

export const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      try {
        const details = await getOrderDetails(orderId);
        setOrderDetails(details);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>Order not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OrderStatus 
          status={orderDetails.status}
          estimatedDelivery={orderDetails.estimatedDelivery}
        />
        
        <OrderMap
          deliveryLocation={orderDetails.deliveryLocation}
          currentLocation={orderDetails.currentLocation}
        />
      </div>
    </div>
  );
}