import React, {useContext, useEffect} from 'react';
import {Marker, Popup, Tooltip, useMapEvents} from "react-leaflet";
import L from "leaflet";
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

const VehicleMarkers: React.FC = () => {
    const {
        vehicles,
        permanentLabels,
        isVehicleRealTime,
        REALTIME_RANGE,
        realtimeVehiclesPosition
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

    const realtime_min_time = new Date(Date.now() - 1000 * REALTIME_RANGE) // 30 secs

    return (
        <>
            {vehicles.map((v: GPSData) => {
                // @ts-ignore
                // @ts-ignore
                return (
                    <Marker key={v.unitID + `_tooltip${permanentLabels}`}
                            position={[v.latitude, v.longitude]}
                            icon={realtimeVehiclesPosition ? (isVehicleRealTime(v.datetime_system, realtime_min_time) ? vehicleIcon : vehicleIconOffline) : vehicleIconImg}
                            riseOnHover={true}
                    >
                        <Popup className="realtime-bus-marker-popup bg-white bg-opacity-75 w-screen sm:w-96" maxWidth={500} /* autoPanPadding={[200, 50]} disable on mobile */>
                            <div className="flex items-center flex-col w-full p-4 rounded-lg transition-opacity duration-250 text-sm">
                                <div className="flex items-center">
                                    <img src={bus_image} alt="Bus"
                                     className="w-10 h-10 object-cover mr-4" />
                                    <div>
                                        <h3 className="font-medium text-blue-600">UnitSN: <span className="font-bold text-black">{v.unitSN}</span></h3>
                                        <h3 className="font-medium text-blue-600">UnitID: <span className="font-bold text-black">{v.unitID}</span></h3>
                                    </div>
                                </div>
                                <div>
                                    <br />
                                    <h3 className="font-medium text-gray-900">[ <span className="font-bold">{v.latitude} , {v.longitude} </span>]</h3>
                                    <br />
                                    <h3 className="font-medium text-blue-600">Last Update: <Moment className="font-bold text-black" fromNow>{v.datetime}</Moment></h3>
                                    <h3 className="font-medium text-blue-600">Timestamp: <Moment className="font-bold text-black" format="DD/MM/YYYY HH:ss" >{v.datetime}</Moment></h3>
                                    <h3 className="font-medium text-blue-600">Speed:  <span className="text-black"><strong>{v.speed}</strong> k/h</span></h3>
                                    <br />
                                    <h3 className="font-medium text-blue-600">DriverID: <span className="font-bold text-black">{v.driverID}</span></h3>
                                    <h3 className="font-medium text-blue-600">DriverID Last Update: <span className="font-bold text-black">{v.driverID_lastupdate}</span></h3>
                                </div>
                            </div>
                        </Popup>
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

/*<div
    className="flex items-center w-full bg-gray-100 p-4 rounded-lg transition-all duration-150 hover:scale-110 sm:bg-transparent sm:p-0">
    <img src="https://pbs.twimg.com/profile_images/1254766882973839360/xP5QuF0U_400x400.jpg" alt="John Doe"
         className="w-10 h-10 object-cover rounded-full mr-4 border border-solid border-white">
        <div><h3 className="text-gray-900 font-semibold">Guseppe Bianchi</h3><h4
            className="text-sm text-gray-700 mt-1">GSSI</h4></div></div>*/