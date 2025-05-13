import React, { useEffect, useState } from 'react';
import MapGL, { Source, Layer, Popup } from 'react-map-gl';
import GeoMap from './components/GeoMap';
import 'mapbox-gl/dist/mapbox-gl.css';
import axiosInstance from './service/axiosInstance';
import { Map } from 'mapbox-gl';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN';

function App() {
  const [geojsons, setGeojsons] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  const fetchData = async () => {
    const res = await axiosInstance.get('/geojsons');
    setGeojsons(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MapGL
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{ longitude: 77, latitude: 28, zoom: 4 }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      getCursor={() => 'default'}

    >
      <GeoMap geojsons={geojsons} />
      
      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <h4>{popupInfo.name}</h4>
            <p>{popupInfo.created_at}</p>
          </div>
        </Popup>
      )}
    </MapGL>
  );
}

export default App;
