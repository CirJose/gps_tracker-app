import { 
    MapContainer, TileLayer, useMap, Marker, 
    Popup, LayersControl, ZoomControl, ImageOverlay
} from 'react-leaflet'
import { render } from 'react-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import L from "leaflet";
import { useState, useEffect } from "react";

function Mapa({ props, children, center=[0, 0], zoom=19, maxZoom=25 }) {
    const icon = L.icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') });

    return (
        <MapContainer
            center={[-33.57189122247987, -70.58437061655818]} 
            zoomControl={false}
            zoom={zoom}
            maxZoom={25}   //CAMBIAR ESTE VALOR CUANDO TENGAS LA IMAGEN DEL MAPA
            scrollWheelZoom={true}
            //maxBounds={[[-33.5292758628275607,-70.7788477202782502], [-33.5273415298458559, -70.7769486371003040]]}
            className="simpleMap"
            style={{ height: '100%', width: '100%' }}
        >
            <ZoomControl position='topright'></ZoomControl>
            <LayersControl position="topright"></LayersControl>
            <TileLayer
                noWrap={true}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />

            <ImageOverlay 
                url="/lider.png" 
                bounds={[[-33.5292758628275607,-70.7788477202782502], [-33.5273415298458559, -70.7769486371003040]]}
            />
            <ImageOverlay 
                url="/oficina.png" 
                bounds={[[-33.45563941768812,-70.70139909314368], [-33.45569256545957,-70.70130856858943]]}
            />

            <ImageOverlay 
                url="/JumboPuenteAlto.png" 
                bounds={[[-33.56987775244443,-70.58785420923256], [-33.572971369125405,-70.58271287857927]]}
            />
            {/* <Marker position={[-33.4727879,-70.6298313]} icon={icon}>
                <Popup>Marker 1</Popup>
            </Marker> 
            <Marker position={[-33.4727879,-70.5298313]} icon={icon}>
                <Popup>Marker 2</Popup>
            </Marker> */}

            {children}

        </MapContainer>
    );
}

export default Mapa;