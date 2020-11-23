// Importing React and Hooks
import React, { useState, useEffect } from 'react';

// Importing the CovidMap component
import CovidMap from "../CovidMap"

// Importing the class (aka, template for creating objects) LoadUSstates
import LoadUSstates from "../../tasks/LoadUSstates"

// This is the Covid19 function
const Covid19 = ({ mapClick }) => {
    // The useState React Hook
    const [usstates, setUsstates] = useState([])

    // The load function...
    // - It uses the LoadUSstates class (aka, template for creating objects)
    //   and runs its associated .load method.
    // - It passes the setUsstates function, which is part of the React Hook.
    // - Because the us-state.json data is being passed already from within
    //   the LoadUSstates class file, it is being passed here, too.
    // - This updates the state of ussates to correspond to the data from us-state.json
    const load = () => {
        const loadUSstatesTask = new LoadUSstates()
        loadUSstatesTask.load(setUsstates)
    }

    // By passing an empty array, this is analogous to componentDidMount
    // It runs the load function once
    useEffect(load, []);

    // This is the return of the function
    return (
        <div>
            {/* Passing down usstates as the value for the prop stateGeom */}
            {/* Also passing down the mapClick prop (aka, the gettingTheMapClick function) */}
            <CovidMap stateGeom={usstates} mapClickTwo={mapClick} />
        </div>
    );
}

// Exporting the function
export default Covid19;