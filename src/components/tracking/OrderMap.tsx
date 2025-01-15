import React, { useEffect, useRef } from 'react';
import { Loader } from 'lucide-react';

interface OrderMapProps {
  deliveryLocation: {
    lat: number;
    lng: number;
  };
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const OrderMap = ({ deliveryLocation, currentLocation }: OrderMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: deliveryLocation,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#242f3e' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#242f3e' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#746855' }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Delivery location marker
      new window.google.maps.Marker({
        position: deliveryLocation,
        map,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        },
        title: 'Delivery Location'
      });

      // Current location marker (if available)
      if (currentLocation) {
        new window.google.maps.Marker({
          position: currentLocation,
          map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          },
          title: 'Current Location'
        });

        // Draw route between points
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          map,
          suppressMarkers: true
        });

        directionsService.route(
          {
            origin: currentLocation,
            destination: deliveryLocation,
            travelMode: window.google.maps.TravelMode.DRIVING
          },
          (response: any, status: string) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(response);
            }
          }
        );
      }
    };

    if (!window.google) {
      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VITE_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [deliveryLocation, currentLocation]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      {!window.google && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Loader className="animate-spin text-purple-600" size={32} />
        </div>
      )}
    </div>
  );
};