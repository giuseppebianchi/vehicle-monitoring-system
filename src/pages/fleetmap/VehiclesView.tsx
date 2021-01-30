import React, {useContext, useEffect, useState} from 'react';
import {Banner, ContentCard, DetailCard, EmptyCard, Sidebar} from "../../components/uikit/uikit";
import classNames from "classnames";

import {GiAerialSignal, GiKeyCard, IoCloudOfflineSharp} from "react-icons/all";
import {GiRadarSweep } from "react-icons/all";
import busImg from '../../assets/images/cng.jpg'
import {GPSData, VehiclesContext} from "./context/vehiclesContext";
import {LatLngTuple} from "leaflet";
import axios from "axios";
import Moment from "react-moment";

const sidebar_content = {
    info: process.env.REACT_APP_SIDEBAR_INFO ? JSON.parse(process.env.REACT_APP_SIDEBAR_INFO) : [],
    classname: "h-full inline-flex flex-col justify-between bg-white shadow p-6 bg-blurred bg-opacity-75 transition duration-150 xl:w-80",
    items: [
        {
            name: "All",
            link: "/all",
            data_url: process.env.REACT_APP_VEHICLES_API_ALL as string,
            icon: <GiRadarSweep />
        },
        {
            name: "Online",
            link: "/online",
            data_url: process.env.REACT_APP_VEHICLES_API_REALTIME as string,
            icon: <GiAerialSignal />
        },
        {
            name: "Offline",
            link: "/offline",
            data_url: process.env.REACT_APP_VEHICLES_API_OFFLINE as string,
            icon: <IoCloudOfflineSharp />
        },
        {
            name: "Driver ID",
            link: "/driverids",
            data_url: process.env.REACT_APP_VEHICLES_API_DRIVERID as string,
            icon: <GiKeyCard />
        },
    ],
    collapsible: true
}

interface ViewProps {
    active: boolean
}

const VehiclesView: React.FC<ViewProps> = ({active}) => {
    const [intervalRealtime, setIntervalRealtime] = useState<any>(null)
    const {
        vehicles,
        setVehicles,
        vehiclesReady,
        setVehiclesReady,
        isVehicleRealTime,
        REALTIME_RANGE,
        map,
        realtimeVehiclesPosition,
        setRealtimeVehiclesPosition,
        filterVehicles,
        setFilterVehicles,
        setVehicleDetails,
        vehicleDetails
    } = useContext(VehiclesContext)

    const realtime_min_time = new Date(Date.now() - 1000 * REALTIME_RANGE) // 30 secs

    const locateVehicle = (point: LatLngTuple) => {
        map.flyTo(point, map.getMaxZoom(), {padding: [150, 150]})
    }

    const fitMarkersState = () => {
        if(map && vehicles.length){
            map.getPanes().mapPane.classList.add("prevent-animation")
            map.flyToBounds(vehicles.map((item: GPSData) => {
                return [item.latitude, item.longitude]
            }), {padding: [150, 50]})
            //setTimeout(, 2000)
        }
    }

    const fitMarkers = (list: GPSData[]) => {
        if(map && list.length){
            map.getPanes().mapPane.classList.add("prevent-animation")
            map.flyToBounds(list.map((item: GPSData) => {
                return [item.latitude, item.longitude]
            }), {padding: [150, 50]})
            //setTimeout(, 2000)
        }
    }

    const setVehiclesByStatus = (v: GPSData[], status: boolean) => {
        if(vehicles){
            const offline = v.filter(i => status ? isVehicleRealTime(i.datetime_system, realtime_min_time) : !isVehicleRealTime(i.datetime_system, realtime_min_time))
            setVehicles(offline)
        }
    }

    const getVehicles = async (url: string, loop: boolean, fit: boolean) => {
        try {
            const res = await axios(url)
            if (res.data) {
                //TEMP - only when offline api are missing, else just setVehicles - to remove when offline api will be added
                filterVehicles === "Offline" ? setVehiclesByStatus(res.data, false) : setVehicles(res.data)
                //setVehicles(res.data)
                if (!loop) {
                    setVehiclesReady(true)
                    if (fit) {
                        fitMarkers(res.data)
                    }

                }
            }
        } catch (err) {
            //throw new Error('Unable to get data from server.')
            //show alert
            setVehiclesReady(null)
            console.log("Unable to get data from server.")
        }
    }

    const getFilterObject = () => {
        return sidebar_content.items.find((i: any) => {
            return i.name === filterVehicles
        })
    }

    useEffect(() => {
        if(vehiclesReady === null){
            return
        }

        //get filter data
        const selected_filter = getFilterObject()
        if(!selected_filter){
            return
        }

        //first request, when data are not ready and interval is not set
        if(vehiclesReady === false){
            //start fetching data
            getVehicles(selected_filter.data_url, false, vehicles.length <= 0)
        }

        //if vehiclesReady is true check if realtime is enabled to start loop
        let intvl: any = null;
        if(vehiclesReady === true && realtimeVehiclesPosition){
            //create interval
            intvl = setInterval( () => {
                //now get only real time data
                getVehicles(selected_filter.data_url, true, false)

                //to check if interval is running correctly
                console.log("Realtime for " + selected_filter.name)
            }, 6000)
            setIntervalRealtime(intvl)
        }

        return () => {
            clearInterval(intvl)
        }


    }, [vehiclesReady])

    useEffect(() => {
        //this function can be executed only if data are ready
        if(!vehiclesReady){
            return
        }
        //set ready to false to start fetching data
        //if no error occurred vehiclesready effect will start loop
        //when ready and realtime flag are true
        if(realtimeVehiclesPosition){
            setVehiclesReady(false)
        }else{
            //stop realtime intervall
            clearInterval(intervalRealtime)
        }

        //in this way we know that data were ready,
        // it will refresh data with realtime enabled and it, if no error occurrs it will start the interval
    }, [realtimeVehiclesPosition])

    useEffect(() => {
        //when filter view changes
        if(filterVehicles === "") {
            setRealtimeVehiclesPosition(false)
            setVehicleDetails(null)
            return
        }

        //clean interval for new filter
        clearInterval(intervalRealtime)

        //initFilterView
        const selected_filter = getFilterObject()
        if(!selected_filter) return
        //start fetching data
        setVehiclesReady(false)
        //getVehicles(selected_filter.data_url, false, true)

        return () => {
            setVehiclesReady(null)
            setVehicles([])
        }
    }, [filterVehicles])

    //update vehicleDetails is needed
    useEffect(() => {
        if(vehicleDetails && vehicles){
            const updated_gps = vehicles.find((i: GPSData) => i.unitID === vehicleDetails.unitID)
            //check if it has been changed
            if(updated_gps){
                if(updated_gps.datetime_system !== vehicleDetails.datetime_system){
                    setVehicleDetails((v: GPSData) => {
                        return {
                            ...v,
                            ...updated_gps
                        }
                    })
                    if(!(map.getBounds().contains([updated_gps.latitude, updated_gps.longitude]))){
                        map.flyTo([updated_gps.latitude, updated_gps.longitude], map.getZoom())
                    }
                    //create a button to follow the marker real time
                    //map.panTo([updated_gps.latitude, updated_gps.longitude], map.getZoom())

                }
            }else{
                setVehicleDetails(null);
            }

        }
    }, [vehicles])


    const onClickSidebarItem = (f: string) => {
        if(f === filterVehicles){
            //close filter view
            setFilterVehicles("")
        }else{
            setFilterVehicles(f)
            //if realtime is enabled it will get to fetch data
        }
    }

    const collapseVehiclesList = () => {
        //set a boolean state for the banner
    }

    return (
        <div id="VehiclesView" className={classNames("absolute h-screen left-0 top-0 w-auto pt-20 flex", { hidden: !active })} style={{zIndex: 999}}>

            {/* Sidebar to get GPD Data in realtime, offline or both*/}
            <Sidebar {...sidebar_content} active={filterVehicles} onClickItem={onClickSidebarItem}/>

            {/* Sidebar for selectg and follow one vehicle /////  filter === sidebar_content.items[3].name &&    */}
                {filterVehicles && <div className="absolute h-full w-80 top-0 -right-80 px-6 bg-transparent max-h-full">
                    <div className="relative w-full h-full inline-flex flex-col pt-44 overflow-y-auto">
                        {/* CARD LIST */}
                        {vehiclesReady ? vehicles.length > 0 ? vehicles.map((i: GPSData) => {
                            const content = {
                                jsx: <div className="b-card-body flex flex-col px-4 pb-8">
                                        <h3 className="font-medium text-blue-300 text-sm">Driver ID: <span className="font-bold text-gray-500">{i.driverID}</span></h3>
                                        {i.driverID_lastupdate && <h3 className="text-blue-300 text-sm">badged: <span className="font-medium text-gray-400 text-sm"><Moment format="llll">{i.driverID_lastupdate}</Moment></span></h3>}
                                </div>,
                                options: {
                                    isRealtime: isVehicleRealTime(i.datetime_system, realtime_min_time)
                                }
                            }
                            return <ContentCard key={i.unitID} subtitle={i.unitID} title={i.unitSN} img={busImg}
                                                content={content}
                                                action={() => locateVehicle([i.latitude, i.longitude])} selected={vehicleDetails?.unitID === i.unitID}/>
                        }) : <div className="bg-white py-6 px-3 sm:px-6 lg:px-8 rounded-md"><h1 className="text-red-500">No Vehicle</h1></div> : <EmptyCard></EmptyCard>}
                    </div>
                    <Banner classname="absolute top-24 left-6 right-6 rounded-md bg-blurred bg-opacity-50 bg-blue-50" onClickClose={() => onClickSidebarItem(filterVehicles)}>
                        <h1 className="text-blue-500">{filterVehicles}</h1>
                    </Banner>
                </div>}
        </div>
    )
}

export default VehiclesView;