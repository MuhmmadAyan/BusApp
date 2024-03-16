import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow, TrafficLayer } from '@react-google-maps/api';
import axios from 'axios';

const Map = () => {
  const mapRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);

  // Replace 'YOUR_API_KEY' with your actual Google Maps API key
  const GOOGLE_MAPS_API_KEY = '';
  const API_ENDPOINT = 'http://3.6.37.230:5000/api/routesdata'; // Replace with your actual API endpoint

  useEffect(() => {
    const loadScript = async () => {
      try {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;
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
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT);
        setRouteData(response.data[0]);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (routeData) {
      const waypoints = routeData.points.slice(1, -1).map(point => ({ location: { lat: point.lat, lng: point.lng } }));

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: routeData.points[0].lat, lng: routeData.points[0].lng },
          destination: { lat: routeData.points[routeData.points.length - 1].lat, lng: routeData.points[routeData.points.length - 1].lng },
          waypoints,
          travelMode: 'DRIVING',
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  }, [routeData]);

  useEffect(() => {

     // Debug statement to check if the Traffic Layer is being initialized
  console.log('Traffic Layer is being initialized:', TrafficLayer);

  // Additional debug statements if needed

  // TrafficLayer for displaying traffic information
  <TrafficLayer autoUpdate />
    console.log('isLoaded:', isLoaded);
    console.log('routeData:', routeData);
    console.log('directions:', directions);

    if (error) {
      console.error('Error:', error);
    }
  }, [isLoaded, routeData, directions, error]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      {isLoaded && routeData && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: 34.081501, lng: 74.784230 }}
          zoom={15}
          ref={mapRef}
        >
          {/* Markers for each waypoint */}
          {routeData.points.map((point, index) => (
            <Marker
              key={index}
              position={{ lat: point.lat, lng: point.lng }}
              icon={{
                url: index === 0 || index === routeData.points.length - 1 ? 'url_to_endpoint_marker_image' : 'url_to_waypoint_marker_image',
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              label={index === 0 || index === routeData.points.length - 1 ? '21B' : null}
            />
          ))}

          {/* InfoWindow for the box with "21B" */}
          {directions && (
            <InfoWindow
              position={{
                lat: routeData.points[Math.floor(routeData.points.length / 2)].lat,
                lng: routeData.points[Math.floor(routeData.points.length / 2)].lng,
              }}
            >
              <div style={{ backgroundColor: 'white', padding: '10px' }}>21B</div>
            </InfoWindow>
          )}

          {/* DirectionsRenderer for displaying the detailed route */}
          {directions && (
            <DirectionsRenderer
              options={{
                directions,
                suppressMarkers: true,
              }}
            />
          )}

          {/* TrafficLayer for displaying traffic information */}
          <TrafficLayer />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;
