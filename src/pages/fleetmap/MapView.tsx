import React, {useContext, useState} from 'react';

import {LayerGroup, MapContainer as LeafletMap, Marker, MarkerProps, TileLayer, useMap, useMapEvents} from "react-leaflet";
import L, {LatLngTuple} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import '../../assets/js/SmoothWheelZoom'

import {UserPositionMarker} from "./components/UserPositionMarker";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import blurMap from '../../assets/images/blur_map.jpg'

import './style/fleetmap.css';

//Components
import MapControlsBanner from "./components/MapControlsBanner";
import VehicleMarkers from "./components/VehicleMarkers";
import {VehiclesContext} from "./context/vehiclesContext";

//Leaflet set Default Icon
let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const MapView: React.FC = () => {
    const center: LatLngTuple = [41.9109, 12.4818];

    const {
        setMap,
        map
    } = useContext(VehiclesContext)

    return (
        <div className="map-layer h-full w-full">
            <LeafletMap
                id="leaflet-map"
                center={center}
                zoom={13}
                placeholder={<h1>MAP</h1>}
                zoomControl={false}
                whenCreated={setMap}
                doubleClickZoom={false}
                closePopupOnClick={true}
                preferCanvas={true}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    detectRetina={true}
                    keepBuffer={5}
                    updateWhenIdle={true}
                />

                <UserPositionMarker />
                {/*<LayerGroup>
                    {map && <GTFSStops />}
                    {map && <GTFSRoute />}
                </LayerGroup>*/}
                {/*<LayerGroup>
                    {map && <Recognizer map={map}/>}
                </LayerGroup>*/}
                <LayerGroup>
                    <VehicleMarkers />
                </LayerGroup>
            </LeafletMap>
            {map && <MapControlsBanner map={map} center={center}/>}
        </div>
    );
};

export default MapView;