import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-600 dark:text-gray-400">
              FoodMart is your one-stop shop for quality groceries and fresh produce.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Home</Link></li>
              <li><Link to="/categories" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Categories</Link></li>
              <li><Link to="/account" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Account</Link></li>
              <li><Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">Help</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail size={16} />
                <span>support@foodmart.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                <span>123 Market St, City, Country</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FoodMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};