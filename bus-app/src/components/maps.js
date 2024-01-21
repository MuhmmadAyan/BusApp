import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import axios from 'axios';

const Map = () => {
  const mapRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState(null);

  // Replace 'YOUR_API_KEY' with your actual Google Maps API key
  const GOOGLE_MAPS_API_KEY = 'AIzaSyBVZEPhBRovTPI0l1lLbdb89u33RaRmzg4';
  const API_ENDPOINT = 'http://15.206.123.117:5000/api/routesdata';


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

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT);
        setRouteData(response.data[0]); // Assuming the API returns an array, update accordingly
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      {isLoaded && routeData && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: 34.081501, lng: 74.784230 }}
          zoom={15}
          ref={mapRef}
        >
          {routeData.points.map((point, index) => (
            <Marker key={index} position={{ lat: point.lat, lng: point.lng }} />
          ))}

          <Polyline
            path={routeData.points.map(point => ({ lat: point.lat, lng: point.lng }))}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;

