// Importing React and useState Hooks from react
import React, { useState } from "react";

import "./styles/Home.css"


// Importing styles from Material-ui
import { makeStyles, ThemeProvider, createMuiTheme, styled } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CssBaseline } from '@material-ui/core';
import 'fontsource-roboto';


// Importing destructured methods from react-router-dom
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Importing Navbar component
import Nav from "./components/Nav";

// Importing the MAP (Covid19) component
import Covid19 from "./components/Covid19";

// Importing the ApiCall component (which gets the Covid19 data [cases, etc.])
import ApiCall from "./components/ApiCall/ApiCall"

// Importing the NewsDisplay component (which displays articles from NY Times)
import NewsDisplay from "./components/NewsDisplay/NewsDisplay"

// Importing the SenatorApiCall component (which gets the senator data [name, party, twitter account])
import SenatorApiCall from "./components/SenatorApiCall/SenatorApiCall"

import TwitterApi from "./components/TwitterApi/TwitterApi"

// Importing the SearchBar component
import SearchBar from "./components/SearchBar/SearchBar"

// Importing the SearchButton component
import SearchButton from "./components/SearchButton/SearchButton"

// Importing the ForeverFactDisplay
import ForeverFactDisplay from "./components/ForeverFactDisplay/ForeverFactDisplay"


import BtnGrp from "./components/ButtonGroup/ButtonGroup"
import { CardActionArea } from "@material-ui/core";

// =================================================================



function Home() {
    // Material UI theme constant
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#9A8C98',
                main: '#4A4E69',
                text: '#22223B'
            },
            secondary: {
                main: '#C9ADA7'
            }
        }
    })
    // useStyles const for beginning styles
    const useStyles = makeStyles((theme) => ({
        grid: {
            width: '100%',
            margin: '0px',
        },
        card: {
            textAlign: 'center',
            minWidth: '100%',
            height: '300px',
            color: theme.palette.text.primary,
            marginTop: '20px',
            // background: '#F2E9E4',
            boxShadow: '0 3px 5px 2px #4A4E69',
            color: '#22223B',
            fontSize: 14

        },
        root: {
            minHeight: '100vh',
            border: 0,
            // background: 'linear-gradient(45deg, #FFFFFF 30%, #F5F5F5 90%)',
            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/vote.jpg'})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: '-1'
        },
        media: {
            maxWidth: 345
        },
        container: {
            margin: 10,
            background: '#FFFFFF',
            opacity: '.5'
        }
    }))

    const classes = useStyles();


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

    const [newsSearchEntry, setNewsSearchEntry] = useState("")

    const [newsResultObject, setNewsResultObject] = useState({})

    const [mostRecentSearch, setMostRecentSearch] = useState({
        unitedStateFilter: "",
        recentNewsSearch: ""
    })
    // ---------------------------------------------------------------
    // A function – to be passed down – that will run when the map is clicked
    // It will update the state object with the United State was most recently clicked
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

        // Checking to make sure that both stateOfTheStates.unitedStateSelected and newsSearchEntry aren't blank
        // If they aren't blank, proceed with the fetch API call to the /news/... route
        // (It's going to the NYTimes and getting articles)
        if (stateOfTheStates.unitedStateSelected !== "" && newsSearchEntry !== "") {

            fetch("/api/externalRoutes/news/" + stateOfTheStates.unitedStateSelected + "/" + newsSearchEntry)
                .then(res => res.json())
                .then(
                    (result) => {
                        // setIsLoaded(true);
                        // setData(result);

                        console.log(result)

                        setNewsResultObject(result)

                        setMostRecentSearch({
                            unitedStateFilter: stateOfTheStates.unitedStateSelected,
                            recentNewsSearch: newsSearchEntry
                        })
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



        // ON CLICK
        // POST the following to the database: stateOfTheStates and newsSearchEntry
        // (Storing the user's search history)
    }

    // =================================================================
    return (
        <Router>

            <ThemeProvider theme={theme}>
                <div className="App">
                    <div className={classes.root}>
                        <CssBaseline />

                        {/* Permanent Nav Bar always exists at the top of the page */}
                        <Nav />

                        <Container maxWidth="l">
                            <Grid container spacing={2} justify="flex-start" alignItems="center" style={{ alignContent: 'center', position: 'relative', }}>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>


                                    {/* RECTANGLE 1 - Map component */}
                                    {/* The MAP component (called "Covid19", passing down the gettingTheMapClick function as a prop  */}
                                    <Covid19 mapClick={gettingTheMapClick} />


                                    {/* RECTANGLE 2 - Forever Fact buttons */}
                                    {/* Forever fact buttons. Clicking the buttons will activate the router switch.
                                            This will route to the relevant display, which will contain relevant forever facts.
                                            Wrapping buttons with router links: https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
                                            This solution is entirely valid HTML, but still "works", and here's essentially what is happening:
                                            We're creating a link (equivalent to <a>), and then button a button "inside" that link
                                            Per this stackoverflow thread, you nest most things inside <a> tags, but not everything:
                                            https://stackoverflow.com/questions/6393827/can-i-nest-a-button-element-inside-an-a-using-html5/6393863#6393863 */}
                                    <BtnGrp />


                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    {/* RECTANGLE 3 - Forever Fact DISPLAY */}
                                    <Grid container spacing={2} justify="center" alignItems="center">
                                        <Card className={classes.card} variant="outlined">
                                            <CardActionArea>
                                                <CardContent>
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
                                                            <TwitterApi />
                                                        </Route>

                                                        <Route exact path="/generalforeverfact">
                                                            {/* Population and general facts component, which will grab local data from our us-states.json file */}
                                                            <ForeverFactDisplay usStateInformation={stateOfTheStates} usstateAbbrev={stateOfTheStates.abbreviation} />
                                                        </Route>
                                                    </Switch>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                    {/* RECTANGLE 4 - News Search and Display */}
                                    <Grid container spacing={2} justify="center" alignItems="center">
                                        <Card className={classes.card} variant="outlined">
                                            <CardContent variant="outlined">
                                                {/* <Typography variant="h5">
                                                    Search By Topic
                                                </Typography> */}
                                                {/* The SearchBar component, which is a simple input form. Passing down the
                                                        handleInputChange function as a prop with onChange, so any change
                                                        will run the handleInputChange function*/}
                                                <SearchBar onChange={handleNewsInputChange} />

                                                {/* The SearchButton component, which is a simple button. Passing down the
                                                        handleSubmit function as a prop with onClick, so any button click will
                                                        run the handleSubmit function */}
                                                <SearchButton onClick={handleNewsSubmit} />

                                                {/* The NewsDisplay, which takes the news articles from the New York Times and displays them */}
                                                <NewsDisplay newsResultProp={newsResultObject} searchHistorySingle={mostRecentSearch} />
                                                {/* <CarouselDisplay /> */}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
            </ThemeProvider>

        </Router>
    );
}

export default Home;
