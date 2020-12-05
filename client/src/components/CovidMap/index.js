// Importing React
import React from 'react';

// Importing properties from "react-leaflet" by using destructuring
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet"

// Importing the necessary CSS to display the React Leaflet map
import "leaflet/dist/leaflet.css"

// This is the CovidMap function
// Destructing the props passed down to get stateGeom and mapClickTwo
const CovidMap = ({ stateGeom, mapClickTwo }) => {
    // - It assigns that name and "binds" it to the map layer
    // - This is done in tandom with the onEachFeature property of <GeoJSON/> below
    const onEachUSstate = (feature, layer) => {
        // This function goes into the feature (aka, the stateGeom data object)
        // and looks for the .properties.name, and then assigns it to usstatename
        const usstatename = feature.properties.name
        // layer.bindPopup binds that usstatename to a popup that appears when clicked
        layer.bindPopup(`${usstatename}`)
        // layer.on click runs the function "clickToFeature" when a usstate is clicked
        layer.on({
            click: clickToFeature
        })
    }

    // https://stackoverflow.com/questions/41950931/registering-event-with-react-leaflet
    // The clickToFeature function runs when a usstate is clicked
    const clickToFeature = (event) => {
        // The event target (aka, what was targeted by the click event)
        // is the particular US State, so grab the feature.properties.name associated
        // Also grab the associated region, abbreviation, and population properties
        const unitedStateName = event.target.feature.properties.name
        const region = event.target.feature.properties.region
        const abbrev = event.target.feature.properties.abbrev
        const pop = event.target.feature.properties.population
        const elec = event.target.feature.properties.electoralvotes
        const poppervote = event.target.feature.properties.poppervote
        // mapClickTwo is a prop passed down
        // Following it back up leads to the gettingTheMapClickFunction
        // This will ultimately set the state object, based on the United State clicked
        // The information will consist of the United State and the associated region

        mapClickTwo(unitedStateName, region, abbrev, pop, elec, poppervote)
    }

    // This is the return of the function, which displays the map
    return (
        <MapContainer style={{ height: "60vh", width: "100%", boxShadow: '0 3px 5px 2px #E63946', marginBottom: 25, position: 'relative' }} zoom={4} center={[39, -96]}>
            <GeoJSON data={stateGeom} onEachFeature={onEachUSstate} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}

// Exporting the function
export default CovidMap;