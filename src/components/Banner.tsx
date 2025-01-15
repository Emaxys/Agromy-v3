import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    title: 'Fresh Ingredients',
    subtitle: 'Cook with the finest ingredients',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc',
    title: 'Organic Produce',
    subtitle: 'Farm fresh vegetables and fruits',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d',
    title: 'Healthy Living',
    subtitle: 'Discover nutritious food options',
  },
];

export const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="mt-16">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative h-[400px]">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
              <div className="text-white ml-12">
                <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
                <p className="text-xl">{banner.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};