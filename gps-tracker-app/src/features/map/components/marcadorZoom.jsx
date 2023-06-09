import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet'
import { render } from 'react-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import L from "leaflet";
import { useState, useEffect } from "react";

function MarcadorZoom({lat=0,lng=0,zoom=19}) {
    const map = useMap();
    map.setView({lat:lat,lng:lng},zoom)
    return null
  }

export default MarcadorZoom;