import React, {useState} from 'react';
import {LatLng} from "leaflet";

const UserPositionContext:any = React.createContext({});

const UserPositionContextProvider = ({ children }: any) => {
    const [userPosition, setUserPosition] = useState<LatLng | null>(null)
    const [userPositionIsLoading, setUserPositionIsLoading] = useState<boolean>(false)

    const userPositionContextValue = {
        userPosition,
        setUserPosition,
        userPositionIsLoading,
        setUserPositionIsLoading
    }

    return (
        <UserPositionContext.Provider value={userPositionContextValue}>
            {children}
        </UserPositionContext.Provider>
    )
}

// and export both objects
export { UserPositionContext, UserPositionContextProvider };