import React from 'react';
import { motion } from 'framer-motion';
import { Banner } from '../components/Banner';
import { FlashSales } from '../components/FlashSales';
import { SuperDeals } from '../components/SuperDeals';
import { SearchSection } from '../components/search/SearchSection';
import { LimitedStocks } from '../components/LimitedStocks';
import { CategorySection } from '../components/categories/CategorySection';
import { FoodBlog } from '../components/blog/FoodBlog';

export const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SearchSection />
      <Banner />
      <SuperDeals />
      <FlashSales />
      <LimitedStocks />
      <CategorySection />
      <FoodBlog />
    </motion.div>
  );
};