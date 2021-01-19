import React from 'react';
import {Sidebar} from "../../components/uikit/uikit";
import MapView from "./MapView";

import {GiAerialSignal, IoCloudOfflineSharp} from "react-icons/all";
import {VscListFilter } from "react-icons/all";
import {GiRadarSweep } from "react-icons/all";
import {UserPositionContextProvider} from "./context/userPositionContext";

const FleetMap = () => {
    return (
        <div id="FleetMap" className="h-screen w-screen">
            {/* <Sidebar {...sidebar_content}/> */}
            <div className="page-wrapper pt-20 h-full w-full">
                <UserPositionContextProvider>
                    <MapView />
                </UserPositionContextProvider>
            </div>

        </div>
    );
};

export default FleetMap;