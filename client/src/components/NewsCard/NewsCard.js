import React, { useState } from "react";

// Importing destructured methods from react-router-dom
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


// Importing the ApiCall component (which gets the Covid19 data [cases, etc.])
import ApiCall from "../ApiCall/ApiCall"

// Importing the NewsDisplay component (which displays articles from NY Times)
import NewsDisplay from "../NewsDisplay/NewsDisplay"

// Importing the SearchBar component
import SearchBar from "../SearchBar/SearchBar"

// Importing the SearchButton component
import SearchButton from "../SearchButton/SearchButton"

function NewsCard() {

    // ---------------------------------------------------------------
    // State elements and objects with Hooks
    const [stateOfTheStates, setStateOfTheStates] = useState({
        unitedStateSelected: "",
        regionSelected: "",
        abbreviation: "",
        population: 0,
        electoralvotes: 0,
        populationpervote: 0
    })
    const gettingTheMapClick = (unitedState, region, abbrev, pop, elec, poppervote) => {
        setStateOfTheStates({
            unitedStateSelected: unitedState,
            regionSelected: region,
            abbreviation: abbrev,
            population: pop,
            electoralvotes: elec,
            populationpervote: poppervote
        })
    }

    const [newsSearchEntry, setNewsSearchEntry] = useState("")

    const [newsResultObject, setNewsResultObject] = useState({})
    // ---------------------------------------------------------------
    // A function - to be passed down - that will run any time the content in the
    // SearchBar component registers an onChange event. As such, it will update
    // the state of newsSearchEntry
    const handleNewsInputChange = (event) => {
        setNewsSearchEntry(event.target.value)
    }
    // ---------------------------------------------------------------
    // A function that runs when the submit button is clicked
    const handleNewsSubmit = (event) => {
        event.preventDefault();
    }
    // Checking to make sure that both stateOfTheStates.unitedStateSelected and newsSearchEntry aren't blank
    // If they aren't blank, proceed with the fetch API call to the /news/... route
    // (It's going to the NYTimes and getting articles)
    if (stateOfTheStates.unitedStateSelected !== "" && newsSearchEntry !== "") {

        fetch("/news/" + stateOfTheStates.unitedStateSelected + "/" + newsSearchEntry)
            .then(res => res.json())
            .then(
                (result) => {
                    // setIsLoaded(true);
                    // setData(result);

                    console.log(result)
                    setNewsResultObject(result)

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);

                    console.log(error)

                }
            )
    }

    return (
        <Grid>
            <SearchBar onChange={handleNewsInputChange} />

            {/* The SearchButton component, which is a simple button. Passing down the
        handleSubmit function as a prop with onClick, so any button click will
        run the handleSubmit function */}
            <SearchButton onClick={handleNewsSubmit} />

            {/* The NewsDisplay, which takes the news articles from the New York Times and displays them */}
            <NewsDisplay newsResultProp={newsResultObject} />
        </Grid>
    );
}

export default NewsCard;