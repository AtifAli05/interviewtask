import React from 'react';
import { Source, Layer } from 'react-map-gl';

const GeoMap = ({ geojsons }) => (
  <>
    {geojsons.map((item) => (
      <Source key={item.id} type="geojson" data={item.geojson}>
        <Layer
          id={`layer-${item.id}`}
          type="fill"
          paint={{ 'fill-color': '#088', 'fill-opacity': 0.5 }}
        />
      </Source>
    ))}
  </>
);

export default GeoMap;
