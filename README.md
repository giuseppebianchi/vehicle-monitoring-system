# Vehicle Monitoring System

A simple web app for AVM systems, written in React and TypeScript, to show location based data in Real Time.

![Vehicles Monitoring System](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/demo.gif?raw=true)

You just need to define the interface of your remote data model.

My custom components (`to improve`) are based on [Tailwind CSS](http://tailwindcss.com) style library (for now loaded via `CDN` to keep configuration simple).

# Features
## Vehicles View

![Vehicles View](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/all_view.png?raw=true)
This view presents a list of API endpoints provided by the user, where they can be selected to request remote data and then showing results on map as markers.

Results are shown on map as markers and their information are listed in a scrollbar. Clicking on a  marker will open a popup, that contains all information about the tracked vehicle.

## Vehicle's Details

![Vehicles Details](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/details.png?raw=true)
When a vehicle is clicked, a box will be shown, listing every information related to that vehicle.

### Speedometer
A simple component has been built to animate speed variations when real time tracking is enabled.


## Filters

![Filter View](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/filter.png?raw=true)


## Real Time
Real Time feature shows vehicles positions in realtime.
Realtime stream can be handled by user via GET requests, setting your favorite interval time to fetch data, or via WebSockets (`incoming) as well.
![Vehicles Real Time](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/all_realtime.png?raw=true)


## GTFS View
`incoming`

This view allows you to show vehicles data on map  with GTFS (General Transit Feed Specification) data provided by a Public Transport Agency, such as bus stops, routes and trips.

## Roadmap
- [x] Location based API support
- [x] Show data in Real Time
- [x] User Position
  
- [x] Map Controls
    - [x] Fit Markers
    - [x] Refresh Data
    - [x] Switch to show Markers Labels
    - [ ] Follow Marker (when a marker is selected)
    
    
- [x] Vehicles View
  - [x] Select API endpoint to fetch data
  - [x] Show results as list
  - [x] Fit Markers when data are ready
  - [x] Markers Leaflet Popup
  - [x] Markers Updates CSS animations
  - [x] Markers Leaflet Tooltip
  - [x] Locate marker on map from list
  - [x] Detail Card Infobox, to show all vehicle's information
  - [x] Speedometer


- [x] Real Time
  - [ ] WebSocket handler
    

- [ ] GTFS View


- [ ] Geocoding

- [ ] Custom and Reusable Components
- [ ] Demo Page - public API needed

- [ ] React Optimizations and Code Refactoring
- [x] React useContext
- [ ] Accessibility

## Release History
`v0.2.1`
- Speedometer in DetailCard to animate speed information when a vehicle is tracked real time.
`v0.2.0`
- Removed Leaflet Popup for markers to introduce DetailCard component
- Now, when a marker is clicked, vehicle's info are shown on a Details Card and its status as well
- When a marker is tracked by user and, moving, gets out from current view bounds, map will change view to center that marker again
  (Follow Marker feature is going to change map's view everytime the tracked marker changes its position)
- DetailCard, like every component from my own UIkit, is going to be a fully reusable component, where content and its logic are passed as props
- Highlighted Card in vehicles list for the selected vehicle
- Sibedar Infobox now gets data from environment variables, by using `process.env`

`v0.1.0`
- Location based API support, User Position
- Real Time
- Map Controls: Fit Markers, Refresh Data, Markers Labels
- Vehicles View: API endpoint list to fetch data, vehicles list

### External Resources
<div>Bus Icon made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

## License

[MIT](LICENSE) © Giuseppe Bianchi
