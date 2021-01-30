import React, {useContext, useEffect} from 'react';
import {Marker, Popup, Tooltip, useMapEvents} from "react-leaflet";
import L, {LeafletMouseEvent} from "leaflet";
import Moment from "react-moment";

import iconBus from '../../../assets/images/bus-icon.svg';
import bus_image from '../../../assets/images/gps.svg';
import {VehiclesContext} from "../context/vehiclesContext";
import classNames from "classnames";

//Vehicle Icon
let vehicleIconImg = L.icon({
    iconUrl: iconBus,
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [18, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [2, -40], // point from which the popup should open relative to the iconAnchor
});
var vehicleIcon = L.divIcon({
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [18, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [2, -40], // point from which the popup should open relative to the iconAnchor
    className: 'realtime-bus-marker bg-label',
    html: `<div class="realtime-bus-bg"></div><img class="realtime-bus-icon" src=${iconBus}>`
});
var vehicleIconOffline = L.divIcon({
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [18, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [2, -40], // point from which the popup should open relative to the iconAnchor
    className: 'realtime-bus-marker bg-label not-updated',
    html: `<div class="realtime-bus-bg"></div><img class="realtime-bus-icon" src=${iconBus}>`
});
var vehicleTracked = L.divIcon({
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [18, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [2, -40], // point from which the popup should open relative to the iconAnchor
    className: 'realtime-bus-marker tracked-marker',
    html: `<div class="realtime-bus-bg"></div><img class="realtime-bus-icon" src=${iconBus}>`
});

interface GPSData {
    "_id": string,
    "unitID": string,
    "unitSN": string,
    "datetime": string,
    "datetime_system": Date,
    "latitude": number,
    "longitude": number,
    driverID: string,
    "driverID_lastupdate": Date,
    "speed": number
}

const LeafletPopup: React.FC<GPSData> = ({unitID, unitSN, datetime, driverID_lastupdate, driverID, speed, latitude, longitude}) => {
    return(
        <Popup className="realtime-bus-marker-popup bg-white bg-opacity-75 w-screen sm:w-96" maxWidth={500} /* autoPanPadding={[200, 50]} disable on mobile */>
            <div className="flex items-center flex-col w-full p-4 rounded-lg transition-opacity duration-250 text-sm">
                <div className="flex items-center">
                    <img src={bus_image} alt="Bus"
                         className="w-10 h-10 object-cover mr-4" />
                    <div>
                        <h3 className="font-medium text-blue-600">UnitSN: <span className="font-bold text-black">{unitSN}</span></h3>
                        <h3 className="font-medium text-blue-600">UnitID: <span className="font-bold text-black">{unitID}</span></h3>
                    </div>
                </div>
                <div>
                    <br />
                    <h3 className="font-medium text-gray-900">[ <span className="font-bold">{latitude} , {longitude} </span>]</h3>
                    <br />
                    <h3 className="font-medium text-blue-600">Last Update: <Moment className="font-bold text-black" fromNow>{datetime}</Moment></h3>
                    <h3 className="font-medium text-blue-600">Timestamp: <Moment className="font-bold text-black" format="DD/MM/YYYY HH:ss" >{datetime}</Moment></h3>
                    <h3 className="font-medium text-blue-600">Speed:  <span className="text-black"><strong>{speed}</strong> k/h</span></h3>
                    <br />
                    <h3 className="font-medium text-blue-600">DriverID: <span className="font-bold text-black">{driverID}</span></h3>
                    <h3 className="font-medium text-blue-600">DriverID Last Update: <span className="font-bold text-black">{driverID_lastupdate}</span></h3>
                </div>
            </div>
        </Popup>
    )
}

const VehicleMarkers: React.FC = () => {
    const {
        vehicles,
        permanentLabels,
        isVehicleRealTime,
        REALTIME_RANGE,
        realtimeVehiclesPosition,
        setVehicleDetails,
        vehicleDetails
    } = useContext(VehiclesContext)

    //useMapHook
    const map = useMapEvents({
        dblclick: (e) => {
            //addMarker(e.latlng)
        },
        zoomstart: (e) => {
            //console.log("start")
            map.getPanes().mapPane.classList.add("prevent-animation")
        },
        zoomend: (e) => {
            //console.log("end")
            map.getPanes().mapPane.classList.remove("prevent-animation")
        }
        //alternative to useMapEvents
        /*useEffect(() => {
            console.log("renderer")
            //map here is passed as prop
            map.on("dblclick", (e: LeafletMouseEvent) => {
                addMarker(e.latlng)
            })
        }, [map])*/
    })

    useEffect(() => {
        //refresh tooltip
        //reset markers animations
        map.getPanes().mapPane.classList.remove("prevent-animation")
    }, [permanentLabels, realtimeVehiclesPosition])

    const handleMarkerEvents = (selected: GPSData) => {
        return {
            click: (e: LeafletMouseEvent) => {
                setVehicleDetails((v: GPSData) => {
                    if(v && v.unitID === selected.unitID){
                        return null;
                    }else{
                        //center selected marker
                        //map.flyTo([selected.latitude, selected.longitude], map.getZoom())
                        return {
                            ...selected
                        };
                    }
                })
            }
        }

    }

    const realtime_min_time = new Date(Date.now() - 1000 * REALTIME_RANGE) // 30 secs

    return (
        <>
            {vehicles.map((v: GPSData) => {
                // @ts-ignore
                // @ts-ignore
                return (
                    <Marker key={v.unitID + `_tooltip${permanentLabels}`}
                            position={[v.latitude, v.longitude]}
                            icon={v.unitID === vehicleDetails?.unitID ? vehicleTracked : realtimeVehiclesPosition ? (isVehicleRealTime(v.datetime_system, realtime_min_time) ? vehicleIcon : vehicleIconOffline) : vehicleIconImg}
                            riseOnHover={true}
                            eventHandlers={handleMarkerEvents(v)}
                    >
                        {/*<LeafletPopup {...v}/>*/}
                        <Tooltip offset={[0, -45]} direction={"top"} className={classNames("realtime-bus-marker-tooltip font-medium transition-opacity duration-500", {'permanent-tooltip': permanentLabels})} permanent={permanentLabels} sticky={false}>
                            <h3 className="font-medium text-blue-600">UnitSN: <span className="font-bold text-black">{v.unitSN}</span></h3>
                            {v.driverID && <h3 className="font-medium text-blue-600">DriverID: <span className="font-bold text-black">{v.driverID}</span></h3> }
                        </Tooltip>
                    </Marker>)

            })}
        </>
    )
}

export default VehicleMarkers;