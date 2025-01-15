import React from 'react';
import { FAQ } from '../components/help/FAQ';
import { ContactInfo } from '../components/help/ContactInfo';

export const HelpPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Help Center</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FAQ />
        </div>
        <div>
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};