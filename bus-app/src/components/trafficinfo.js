// TrafficInfo.js
import React from 'react';
import { TrafficLayer } from '@react-google-maps/api';

const TrafficInfo = () => {
  return (
    <TrafficLayer
      options={{
        autoRefresh: true, // Enable auto-refresh for traffic data
      }}
    />
  );
};

export default TrafficInfo;
