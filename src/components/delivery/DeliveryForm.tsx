import React from 'react';
import { MapPin, Phone, User } from 'lucide-react';

interface DeliveryFormProps {
  form: {
    name: string;
    phone: string;
    address: string;
    notes: string;
  };
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
}

export const DeliveryForm = ({ form, loading, onSubmit, onChange }: DeliveryFormProps) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium mb-2">
        <div className="flex items-center gap-2">
          <User size={18} />
          Full Name
        </div>
      </label>
      <input
        type="text"
        value={form.name}
        onChange={(e) => onChange('name', e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        <div className="flex items-center gap-2">
          <Phone size={18} />
          Phone Number
        </div>
      </label>
      <input
        type="tel"
        value={form.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          Delivery Address
        </div>
      </label>
      <textarea
        value={form.address}
        onChange={(e) => onChange('address', e.target.value)}
        rows={3}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Delivery Notes (Optional)
      </label>
      <textarea
        value={form.notes}
        onChange={(e) => onChange('notes', e.target.value)}
        rows={2}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
        placeholder="Any special instructions for delivery"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 
               text-white py-3 px-4 rounded-lg transition-colors"
    >
      {loading ? 'Processing...' : 'Confirm Order'}
    </button>
  </form>
);