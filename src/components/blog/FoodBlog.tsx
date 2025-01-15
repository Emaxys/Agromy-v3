import React from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: "Traditional Nigerian Jollof Rice",
    image: "https://images.unsplash.com/photo-1575931953324-fcac7d1f48fd",
    excerpt: "Discover the secrets behind making the perfect Nigerian Jollof Rice...",
    author: "Chef Ada",
    date: "2024-02-20"
  },
  {
    id: 2,
    title: "Health Benefits of Egusi Soup",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    excerpt: "Learn about the amazing health benefits of this traditional Nigerian soup...",
    author: "Dr. Chioma",
    date: "2024-02-18"
  },
  {
    id: 3,
    title: "Perfect Pounded Yam Guide",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
    excerpt: "Master the art of making smooth and delicious pounded yam...",
    author: "Chef Okon",
    date: "2024-02-15"
  }
];

export const FoodBlog = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Food & Culture Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-pink-500/20 dark:bg-yellow-500/20 group-hover:bg-pink-500/30 dark:group-hover:bg-yellow-500/30 transition-colors" />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};