import React, {useState} from 'react';
import Header from './components/header/Header'

import FleetMap from "./pages/fleetmap/FleetMap";

import logo from './logo.svg';
import './assets/colors.scss';
import './components/uikit/uikit.css';
import './App.css';
import VehiclesView from "./pages/fleetmap/VehiclesView";
import GTFSView from "./pages/fleetmap/GTFSView";
import {
  BrowserRouter as Router
} from "react-router-dom";
import {VehiclesContextProvider} from "./pages/fleetmap/context/vehiclesContext";

const config = {
  pages: [
    {
      name: "Vehicles",
      link: "/vehicles",
      active: false,
      view: VehiclesView
    },
    {
      name: "GTFS",
      link: "/gtfs",
      active: false,
      view: GTFSView
    },
    {
      name: "Recognizer",
      link: "/recognizer",
      active: false,
    }
  ]
}

function App() {
  const [ activeView, setActiveView ] = useState("")
  const handleNavbarAction = (view: string) => {
    setActiveView(view)
  }
  return (
    <div className="App">
      <Router>
        <Header navbar={config.pages} action={handleNavbarAction} />
        <VehiclesContextProvider>
        <FleetMap />
          {config.pages.map((item) => {
            if (typeof item.view !== "undefined") {
              return React.createElement(item.view, {
                active: activeView === item.name
              });
            }
          })}
        </VehiclesContextProvider>
      </Router>
    </div>
  );
}

export default App;
