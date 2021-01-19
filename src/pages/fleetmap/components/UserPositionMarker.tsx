import React, {useContext} from "react";
import {UserPositionContext} from "../context/userPositionContext";
import {Marker, useMapEvents} from "react-leaflet";
import L from "leaflet";

import userPositionIconImage from '../../../assets/images/ripple.svg'

let userPositionIcon = L.icon({
    iconUrl: userPositionIconImage,
    iconSize:     [50, 50], // size of the icon
    popupAnchor:  [-3, -76], // point from which the popup should open relative to the iconAnchor
    iconAnchor: [24, 28],
});

export const UserPositionMarker: React.FC = () => {
    const { userPosition,
        setUserPosition,
        setUserPositionIsLoading
    } = useContext(UserPositionContext);

    const map = useMapEvents({
        locationfound: (e) => {
            //location found
            if(!userPosition){
                //map.addLayer(marker);
                setUserPositionIsLoading(false)
                map.flyTo(e.latlng, map.getZoom())
            }
            setUserPosition(e.latlng)
        },
        locationerror: (e) => {
            //check error code

            //code: 1, message: "Geolocation error: User denied Geolocation."
            if(e.code === 1){
                map.stopLocate()
                setUserPosition(null)
                setUserPositionIsLoading(false)
                //show alert -> print e.message
            }

            //code: 3, message: "Geolocation error: Timeout expired."
            if(e.code === 3) {
                if (!userPosition) {
                    map.stopLocate()
                    setUserPositionIsLoading(false)
                    //show alert -> print e.message
                }
            }
            //else keep watching position
        }
    })

    return userPosition && <Marker position={userPosition} icon={userPositionIcon}/>;
}