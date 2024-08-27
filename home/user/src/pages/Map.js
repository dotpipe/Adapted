// /components/web/pages/Map.js
import React, { useEffect, useState } from 'react';
import { getOptimizedRoute } from '../services/MapService';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';


function Map() {
  const [route, setRoute] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    if (origin && destination) {
      getOptimizedRoute(origin, destination, 'userId')
        .then(optimizedRoute => setRoute(optimizedRoute));
    }
  }, [origin, destination]);

  return (
    <div>
      <h1>Map</h1>
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <GoogleMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={8}
      >
        {route && (
          <Polyline
            path={route.map(point => ({ lat: point.lat, lng: point.lng }))}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default { Map };