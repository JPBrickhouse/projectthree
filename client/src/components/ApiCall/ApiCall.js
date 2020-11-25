// Importing React and Hooks
import React, { useEffect, useState } from "react"

// -----------------------------------------------------------
// REFERENCE for making the API call
// 
// Sourcing the information from the Covid Tracking Project by The Atlantic
// - https://covidtracking.com/
// - https://covidtracking.com/data
// - https://covidtracking.com/data/api
// 
// Mozilla documentation about the fetch method
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
//
// Example Call:
// URL: "https://api.covidtracking.com/v1/states/" + state + "/current.json"
// -----------------------------------------------------------

// This is the ApiCall function and we are passing it props
function ApiCall(props) {

    // State object with hooks
    const [stateAndCovidData, setStateAndCovidData] = useState({
        covidData: {},
    })

    // useEffect that conditionally runs when props.usstateAbbrev changes
    useEffect(() => {
        // Making the api call to fetch the Covid Data (cases, etc.)
        fetch("https://api.covidtracking.com/v1/states/" + props.usstateAbbrev + "/current.json")
            .then(response => response.json())
            .then(data => {
                setStateAndCovidData({
                    covidData: data,
                })
            })
    }, [props.usstateAbbrev])

    return (
        <div>
            {/* -------------------------------------------- */}
            {/* FANCY Covid Data component goes here
            Pass down the CovidData object as a prop */}

            <p>{stateAndCovidData.covidData.positive}</p>
            <p>{stateAndCovidData.covidData.hospitalizedCurrently}</p>
            <p>{stateAndCovidData.covidData.death}</p>
            {/* -------------------------------------------- */}
        </div>
    )
}

export default ApiCall