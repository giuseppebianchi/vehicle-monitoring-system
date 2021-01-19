# Vehicles Monitoring System

A simple web app for AVM systems, written in React and TypeScript, to show location based data in Real Time.

![Vehicles View](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/demo.gif?raw=true)

You just need to define the interface of your remote data model.
My custom components (`to improve`) are based on [Tailwind CSS](http://tailwindcss.com) style libray (for now loaded via `CDN to keep configuration simple).


# Vehicles View

This view presents a list of API endpoints provided by the user, where they can be selected to request remote data and then showing results on map as markers.
![Vehicles View](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/all_view.png?raw=true)

## Real Time
Realtime stream is can be handled by user via GET requests, setting its favorite interval time to fetchd data or via WebSockets (`incoming) as well.
![Vehicles Real Time](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/all_realtime.png?raw=true)

## Filter View
Results are shown on map as markers and their information are listed in a scrollbar. Clicking on a  marker will open a popup, that contains all information about the tracked vehicle.

![Filter View](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/filter.png?raw=true)

![Filter View Empty](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/empty.png?raw=true)

![Filter Loading View](https://github.com/giuseppebianchi/vehicle-monitoring-system/blob/master/public/screenshots/loading.png?raw=true)

## GTFS View
`incoming`

This view allows you to show on map vehicles data with some GTFS (General Transit Feed Specification) data provided from a Public Transport Agency, such as bus stops, routes and trips.

## License

[MIT](LICENSE) © Giuseppe Bianchi
