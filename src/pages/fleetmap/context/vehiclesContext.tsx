import React, {useState} from 'react';
import L from "leaflet";

const VehiclesContext:any = React.createContext({});

export interface GPSData {
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

const VehiclesContextProvider = ({ children }: any) => {
    const [vehicles, setVehicles] = useState<GPSData[]>([])
    const [vehiclesReady, setVehiclesReady] = useState(null)
    const [realtimeVehiclesPosition, setRealtimeVehiclesPosition] = useState(false)
    const [map, setMap] = useState<L.Map | null>(null)
    const [filterVehicles, setFilterVehicles] = useState<string>( "")
    const [permanentLabels, setPermanentLabels] = useState(false)
    const REALTIME_RANGE = 30; // 30 SECONDS

    const isVehicleRealTime = (vehicle: Date, time: Date) => {
        return vehicle > time
    }

    const vehiclesContextValue = {
        vehicles,
        setVehicles,
        vehiclesReady,
        setVehiclesReady,
        permanentLabels,
        setPermanentLabels,
        REALTIME_RANGE,
        isVehicleRealTime,
        map,
        setMap,
        realtimeVehiclesPosition,
        setRealtimeVehiclesPosition,
        filterVehicles,
        setFilterVehicles
    }

    return (
        <VehiclesContext.Provider value={vehiclesContextValue}>
            {children}
        </VehiclesContext.Provider>
    )
}

// and export both objects
export { VehiclesContext, VehiclesContextProvider };