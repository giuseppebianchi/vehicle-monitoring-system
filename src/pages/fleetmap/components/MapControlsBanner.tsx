import React, {useContext} from 'react';
import {
    FaCrosshairs,
    FaLocationArrow,
    FaTag,
    GrRefresh,
    IoMdRefresh, IoRefreshSharp,
    MdAllOut,
    MdLabel,
    MdRefresh, VscRefresh
} from "react-icons/all";
import {Banner} from "../../../components/uikit/uikit";
import {UserPositionContext} from "../context/userPositionContext";
import classNames from "classnames";
import L, {LatLngTuple} from "leaflet";
import {VehiclesContext} from "../context/vehiclesContext";

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

    return (
        <Banner {...map_controls}>
            {(filterVehicles.length > 0 && !realtimeVehiclesPosition && vehiclesReady !== null) && <MapControlButton onClickEvent={handleRefreshVehicles} isLoading={!vehiclesReady}><VscRefresh /></MapControlButton>}
            {(filterVehicles.length > 0 && vehiclesReady !== null) && <MapControlButton active={realtimeVehiclesPosition} onClickEvent={handleRealtimeTracking} classname="map-control-button-live" isLoading={!vehiclesReady}>LIVE</MapControlButton>}
            <MapControlButton active={permanentLabels} onClickEvent={handleVehiclesLabels}><FaTag /></MapControlButton>
            <MapControlButton onClickEvent={fitMap}><MdAllOut /></MapControlButton>
            <MapControlButton active={userPosition ? true : false} onClickEvent={getUserPosition} isLoading={userPositionIsLoading}><FaLocationArrow /></MapControlButton>
            {userPosition && <MapControlButton onClickEvent={centerUserPosition}><FaCrosshairs /></MapControlButton>}
        </Banner>
    );
};

export default MapControlsBanner;