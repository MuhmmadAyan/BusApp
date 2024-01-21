import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  // Replace 'YOUR_API_KEY' with your actual Google Maps API key
  const GOOGLE_MAPS_API_KEY = 'AIzaSyBVZEPhBRovTPI0l1lLbdb89u33RaRmzg4';

  useEffect(() => {
    // Load the Google Maps script asynchronously
    const loadScript = async () => {
      try {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = () => setIsLoaded(true);
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Maps script:', error);
      }
    };

    loadScript();
  }, []);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: 34.081501,lng: 74.784230}} // Initial center coordinates
          zoom={10} // Initial zoom level
          ref={mapRef}
        >
          {/* Add markers or other map features as needed */}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;
