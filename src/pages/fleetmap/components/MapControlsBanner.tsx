import React, {useContext} from 'react';
import {
    FaCrosshairs,
    FaLocationArrow,
    FaTag,
    GrRefresh,
    IoMdRefresh, IoRefreshSharp, IoSpeedometer,
    MdAllOut,
    MdLabel,
    MdRefresh, VscRefresh
} from "react-icons/all";
import {Banner, DetailCard} from "../../../components/uikit/uikit";
import {UserPositionContext} from "../context/userPositionContext";
import classNames from "classnames";
import L, {LatLngTuple} from "leaflet";
import {GPSData, VehiclesContext} from "../context/vehiclesContext";
import {Popup} from "react-leaflet";
import bus_image from "../../../assets/images/bus-icon.svg";
import Moment from "react-moment";
import iconBus from "../../../assets/images/bus-icon.svg";

interface MapControlButtonProps {
    onClickEvent?: (e: React.MouseEvent) => void;
    active?: boolean;
    isLoading?: boolean;
    classname?: string
}

const MapControlButton: React.FC<MapControlButtonProps> = ({children, onClickEvent, active, isLoading, classname}) => {
    //handle click
    const classlist = classNames("w-full sm:w-auto inline-flex cursor-pointer items-center justify-center font-medium leading-none rounded-lg shadow-sm py-3 px-5 border border-transparent transform transition-all duration-150",
        {"group-hover:shadow-lg group-hover:-translate-y-0.5  hover:bg-white hover:text-red-300 active text-white": active && !isLoading},
        {"group-hover:text-blue-300": !classname},
        {" bg-blue-500": active && !classname},
        {"group-hover:shadow-lg group-hover:-translate-y-0.5  bg-white": !active && !isLoading},
        {"bg-white text-blue-300 pointer-events-none": isLoading})
    return (
        <span className="group flex mx-3">
            <div onClick={onClickEvent} className={classname ? `${classname} ${classlist}` : classlist}>
                {children}
            </div>
        </span>
    )
}

const map_controls = {
    style: {
        zIndex: 999,
        maxWidth: "70%"
    },
    classname: "absolute rounded-lg bg-white bg-opacity-50 w-max bottom-6 right-6 bg-blurred shadow-lg border border-gray-200 transition-all duration-500"
}

const MapControlsBanner: React.FC<{map: L.Map, center?: LatLngTuple}> = ({map, center}) => {

    //get Markers context
    const {
        vehicles,
        vehiclesReady,
        setVehiclesReady,
        setPermanentLabels,
        realtimeVehiclesPosition,
        setRealtimeVehiclesPosition,
        filterVehicles,
        permanentLabels,
        vehicleDetails,
        setVehicleDetails,
        isVehicleRealTime,
        REALTIME_RANGE
    } = useContext(VehiclesContext)

    const { userPosition,
        setUserPosition,
        userPositionIsLoading,
        setUserPositionIsLoading
    } = useContext(UserPositionContext);

    const centerUserPosition = (e: React.MouseEvent) => {
        if(map && userPosition){
            map.flyTo(userPosition, 18)
        }
    }

    const fitMap = (e: React.MouseEvent) => {
        //if userposiiton and markers are not avalable use center value
        if(map){
            const bounds = L.latLngBounds([vehicles.map((i: any) => [i.latitude, i.longitude]), userPosition]);
            //map.fitBounds(bounds, {padding: [150, 50]});
            map.flyToBounds(bounds, {padding: [150, 50]})
        }
    }

    const getUserPosition = (e: React.MouseEvent) => {
        if(userPosition){
            map.stopLocate()
            setUserPosition(null)
        }else{
            setUserPositionIsLoading(true)
            map.locate({
                watch: true,
                enableHighAccuracy: true,
                timeout: 10000
            })
        }
    }

    const handleVehiclesLabels = () => {
        map.getPanes().mapPane.classList.add("prevent-animation")
        setPermanentLabels((label: boolean) => {
            return !label
        })
    }

    const handleRealtimeTracking = () => {
        setRealtimeVehiclesPosition(!realtimeVehiclesPosition)
    }

    const handleRefreshVehicles = () => {
        setVehiclesReady(false)
    }

    const realtime_min_time = new Date(Date.now() - 1000 * REALTIME_RANGE) // 30 secs
    return (
        <>
            {vehicleDetails && <DetailCard
                title={vehicleDetails.unitSN}
                subtitle={vehicleDetails.unitID}
                content={{
                    jsx: <>
                        <div className="flex items-center p-4 rounded-lg">
                            <div className="flex-auto pr-4 truncate">
                                <h3 className="font-bold text-blue-300 text-sm">Lat: <span className="font-bold text-black">{vehicleDetails.latitude.toFixed(10)}</span></h3>
                                <h3 className="font-bold text-blue-300 text-sm">Lon: <span className="font-bold text-black">{vehicleDetails.longitude.toFixed(10)}</span></h3>
                            </div>
                            <div className="realtime-bus-marker w-10 h-10 relative tracked-marker m-0 flex-none">
                                <div className="realtime-bus-bg"></div>
                                <img className="realtime-bus-icon" src={iconBus} />
                            </div>
                        </div>
                        <div className="b-card-body flex flex-col p-4">
                        <h3 className="font-medium text-gray-400 flex items-center text-lg text-blue-300"><IoSpeedometer /><span className="text-black ml-2"><strong>{parseInt(vehicleDetails.speed)}</strong> k/h</span></h3>
                        <h3 className="font-medium text-gray-400">Last Update: <Moment className="font-bold text-black" fromNow>{vehicleDetails.datetime}</Moment></h3>
                        <h3 className="font-medium text-gray-400">Timestamp: <Moment className="font-bold text-black" format="DD/MM/YYYY HH:mm:ss" >{vehicleDetails.datetime}</Moment></h3>
                        <br />
                        <h3 className="font-medium text-gray-400">DriverID: <span className="font-bold text-black">{vehicleDetails.driverID}</span></h3>
                        <h3 className="font-medium text-gray-400">DriverID Last Update: <span className="font-bold text-black">{vehicleDetails.driverID_lastupdate}</span></h3>
                        <br />
                            {/*<h3 className="font-medium text-gray-900 bg-white bg-opacity-50 -mx-4 px-4 py-2 rounded-md" style={{fontSize: '0.6rem', whiteSpace: "nowrap"}}>[ <span className="font-bold">{vehicleDetails.latitude} , {vehicleDetails.longitude} </span>]</h3>*/}
                        </div>
                        </>,
                    options: {
                        isRealtime: isVehicleRealTime(vehicleDetails.datetime_system, realtime_min_time),
                        realtimeActive: realtimeVehiclesPosition
                    }
                }}
                img={<div className={classNames("h-8 w-8 rounded-full", {"bg-realtime": isVehicleRealTime(vehicleDetails.datetime_system, realtime_min_time)}, {"bg-offline": !isVehicleRealTime(vehicleDetails.datetime_system, realtime_min_time)}, {"animate-pulse": realtimeVehiclesPosition})}/>}
                classname="detail-card detail-card-marker-popup flex flex-col text-gray w-80 h-auto mb-5 absolute right-10 bottom-40 text-sm"
                style={{zIndex: 999}}
                actions={{
                    onClose: () => setVehicleDetails(null),
                    button1: () => map.flyTo([vehicleDetails.latitude, vehicleDetails.longitude], map.getMaxZoom()),
                }}
            />}
            <Banner {...map_controls}>
                {(filterVehicles.length > 0 && !realtimeVehiclesPosition && vehiclesReady !== null) && <MapControlButton onClickEvent={handleRefreshVehicles} isLoading={!vehiclesReady}><VscRefresh /></MapControlButton>}
                {(filterVehicles.length > 0 && vehiclesReady !== null) && <MapControlButton active={realtimeVehiclesPosition} onClickEvent={handleRealtimeTracking} classname="map-control-button-live" isLoading={!vehiclesReady}>LIVE</MapControlButton>}
                <MapControlButton active={permanentLabels} onClickEvent={handleVehiclesLabels}><FaTag /></MapControlButton>
                <MapControlButton onClickEvent={fitMap}><MdAllOut /></MapControlButton>
                <MapControlButton active={userPosition ? true : false} onClickEvent={getUserPosition} isLoading={userPositionIsLoading}><FaLocationArrow /></MapControlButton>
                {userPosition && <MapControlButton onClickEvent={centerUserPosition}><FaCrosshairs /></MapControlButton>}
            </Banner>
        </>
    );
};

export default MapControlsBanner;