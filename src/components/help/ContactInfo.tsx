import React from 'react';
import { Mail, Phone } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="text-purple-600" size={20} />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-gray-600 dark:text-gray-400">support@foodmart.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-purple-600" size={20} />
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-gray-600 dark:text-gray-400">+1 (234) 567-8900</p>
          </div>
        </div>
      </div>
    </div>
  );
};