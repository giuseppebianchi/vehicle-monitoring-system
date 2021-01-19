import React from 'react';
import classNames from "classnames";

import {
    FaBus,
    FaRoad,
    RiRouteFill,
    VscActivateBreakpoints
} from "react-icons/all";

const sidebar_content = {
    info: {
        top: "AMA L'Aquila",
        bottom: "GTFS",
        img: "https://www.snap4city.org/gtfsmanager/extra_files/GTFS.png"
    },
    classname: "h-screen w-full inline-flex flex-col justify-between items-center bg-white shadow p-6 pt-28 bg-blurred bg-opacity-75 transition duration-150 xl:text-xl",
    style: {
      zIndex: 999
    },
    items: [
        {
            name: "Stops",
            link: "/all",
            action: () => console.log("all"),
            active: false,
            icon: <VscActivateBreakpoints />
        },
        {
            name: "Routes",
            link: "/realtime",
            action: () => console.log("realtime"),
            active: false,
            icon: <FaBus />
        },
        {
            name: "Patterns",
            link: "/offline",
            action: () => console.log("offline"),
            active: false,
            icon: <RiRouteFill />
        },
        {
            name: "Trips",
            link: "/offline",
            action: () => console.log("offline"),
            active: false,
            icon: <FaRoad />
        },
    ],
    collapsible: true
}

interface ViewProps {
    active: boolean
}

const GTFSView: React.FC<ViewProps> = ({active}) => {
    return (
        <div id="VGTFSView" className={classNames("absolute h-screen right-0 top-0 w-1/4",
            { hidden: !active })} style={sidebar_content.style} >
        </div>
    );
};

export default GTFSView;