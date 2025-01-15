import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNavbar } from './components/MobileNavbar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AccountPage } from './pages/AccountPage';
import { HelpPage } from './pages/HelpPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PayOnDeliveryPage } from './pages/PayOnDeliveryPage';
import { DeliveryAddressPage } from './pages/DeliveryAddressPage';
import { AdminPanel } from './pages/AdminPanel';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { WalletPage } from './pages/WalletPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const darkMode = useStore((state) => state.darkMode);
  const { user } = useAuth();

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen pb-16 md:pb-0">
          <Header />
          
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/cart" element={<CartPage />} />
              {user && (
                <>
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/pay-on-delivery" element={<PayOnDeliveryPage />} />
                  <Route path="/delivery-address" element={<DeliveryAddressPage />} />
                  <Route path="/track-order" element={<OrderTrackingPage />} />
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                </>
              )}
              {user?.user_metadata?.isAdmin && (
                <Route path="/admin" element={<AdminPanel />} />
              )}
            </Routes>
          </main>
          
          <Footer />
          <MobileNavbar />
          <WhatsAppButton />
          <Toaster position="top-right" />
        </div>
      </div>
    </Router>
  );
};

export default App;