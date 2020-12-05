import React, { useState } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme, styled } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { blue, purple } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { sizing, flexbox } from '@material-ui/system';

// Importing destructured methods from react-router-dom
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Importing the ApiCall component (which gets the Covid19 data [cases, etc.])
import ApiCall from "../ApiCall/ApiCall"

// Importing the SenatorApiCall component (which gets the senator data [name, party, twitter account])
import SenatorApiCall from "../SenatorApiCall/SenatorApiCall"


// Importing the ForeverFactDisplay
import ForeverFactDisplay from "../ForeverFactDisplay/ForeverFactDisplay"

function ForeverFactCard() {

    // State elements and objects with Hooks
    const [stateOfTheStates, setStateOfTheStates] = useState({
        unitedStateSelected: "",
        regionSelected: "",
        abbreviation: "",
        population: 0,
        electoralvotes: 0,
        populationpervote: 0
    })

    const [newsSearchEntry, setNewsSearchEntry] = useState("")
    const [newsResultObject, setNewsResultObject] = useState({})

    return (
        <Grid>
            <Switch>
                <Route exact path="/covidforeverfact">
                    {/* The ApiCall component, which makes an ajax call to the Covid Data API, and displays relevant case data.
                    Passing down the unitedStateSelected as a prop */}
                    <ApiCall usstateAbbrev={stateOfTheStates.abbreviation} />
                </Route>

                <Route exact path="/senatorforeverfact">
                    {/* The SenatorApiCall component, which makes an ajax call to the Pro Publica API, and displays relevant state senator data.
                    Passing down the unitedStateSelected as a prop */}
                    <SenatorApiCall usstateAbbrev={stateOfTheStates.abbreviation} />
                </Route>

                <Route exact path="/generalforeverfact">
                    {/* Population and general facts component, which will grab local data from our us-states.json file */}
                    <ForeverFactDisplay usStateInformation={stateOfTheStates} />
                </Route>
            </Switch>
        </Grid>
    );
};


export default ForeverFactCard;