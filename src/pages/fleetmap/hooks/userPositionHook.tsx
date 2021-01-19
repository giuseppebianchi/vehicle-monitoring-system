import React, {useContext, useState} from 'react';
import L, {ErrorEvent, LocationEvent} from "leaflet";
import {useMap} from "react-leaflet";
import {UserPositionContext} from "../context/userPositionContext";

export const useUserPosition = (map: L.Map) => {

    const { userPosition,
        setUserPosition,
        setUserPositionIsLoading
    } = useContext(UserPositionContext);


    const getUserPosition = (e: React.MouseEvent) => {
        console.log("get", userPosition, map)
        if(userPosition){
            map.stopLocate()
            setUserPosition(null)
        }else{
            setUserPositionIsLoading(true)
            map.locate({
                watch: true,
                enableHighAccuracy: true,
                maximumAge: 1000
            })
        }
    }

    const handleLocationFound = (e: LocationEvent) => {
        //location found
        if(!userPosition){
            //map.addLayer(marker);
            setUserPositionIsLoading(false)
            map.flyTo(e.latlng, map.getZoom(), {
                animate: true,
                duration: 1000
            })
        }
        setUserPosition(e.latlng)
    }
    const handleLocationError = (e: ErrorEvent) => {
        //check error type
        //code: 1, message: "Geolocation error: User denied Geolocation."
        if(e.code === 1){
            map.stopLocate()
            setUserPosition(null)
            setUserPositionIsLoading(false)
        }
        //code: 3, message: "Geolocation error: Timeout expired."
        if(!userPosition){
            map.stopLocate()
            setUserPositionIsLoading(false)
            //console.log("error", e)
        }
        //show alert -> e.message
    }

    const centerUserPosition = (e: React.MouseEvent) => {
        if(map && userPosition){
            map.flyTo(userPosition, map.getZoom(), {
                animate: true,
                duration: 1000
            })
        }
    }

    /*const emap = useMapEvents({
        locationfound(e) {
            handleLocationFound(e)
        },
        locationerror(e) {
            handleLocationError(e)
        },
    })*/


    return {
        getUserPosition,
        centerUserPosition
    };
};
