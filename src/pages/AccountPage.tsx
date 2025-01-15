import React from 'react';
import { AccountForm } from '../components/account/AccountForm';
import { OrderHistory } from '../components/account/OrderHistory';

export const AccountPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AccountForm />
        <OrderHistory />
      </div>
    </div>
  );
};