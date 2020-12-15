// Importing React and useState Hooks from react
import React, { useEffect, useState } from "react";

// Importing styles
import "./styles/Home.css"

// Importing styles from Material-ui
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Box, Container, Grid, Card, CardContent, CssBaseline, Typography, BottomNavigation } from "@material-ui/core";
import 'fontsource-roboto';

// Importing destructured methods from react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";

// Importing the MAP (Covid19) component
import Covid19 from "./components/Covid19";

// Importing the ApiCall component (which gets the Covid19 data [cases, etc.])
import ApiCall from "./components/ApiCall/ApiCall"

// Importing the NewsDisplay component (which displays articles from NY Times)
import NewsDisplay from "./components/NewsDisplay/NewsDisplay"

// Importing the SenatorApiCall component (which gets the senator data [name, party, twitter account])
import SenatorApiCall from "./components/SenatorApiCall/SenatorApiCall"

// Importing Trending News Card
import TrendingNewsCard from "./components/TrendingNewsCard/TrendingNewsCard"

// Importing the SearchBar component
import SearchBar from "./components/SearchBar/SearchBar"

// Importing the SearchButton component
import SearchButton from "./components/SearchButton/SearchButton"

// Importing the ForeverFactDisplay
import ForeverFactDisplay from "./components/ForeverFactDisplay/ForeverFactDisplay"

import BtnGrp from "./components/ButtonGroup/ButtonGroup"
import { CardActionArea } from "@material-ui/core";

// =================================================================


function Home(props) {

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
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },

    })


    // useStyles const for beginning styles
    const useStyles = makeStyles(() => ({
        grid: {
            width: '100%',
            margin: '0px',
        },
        card: {
            textAlign: 'center',
            minWidth: '100%',
            height: '325px',
            margin: '20px 10px',
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            color: '#1D3557',
            backgroundColor: '#F1FAEE',
            fontSize: 14,
            "&:hover": {
                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
            }
        },
        root: {
            minHeight: '100vh',
            border: 0,
            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/dc-img-4.jpg'})`,
            backgroundPosition: 'left top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: '-1',
        },
        media: {
            maxWidth: 345
        },
        container: {
            margin: 0,
            alignContent: 'center',
            position: 'relative',
        },
        footer: {
            background: "#1d3557",
        },
        cover: {
            height: 150,
            margin: "auto"
        },
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

    const [fullSearchHistoryObject, setFullSearchHistoryObject] = useState([])

    const [userSearchHistoryObject, setUserSearchHistoryObject] = useState([])
    // ---------------------------------------------------------------
    // useEffect that runs one time when the page loads,
    // in order to populate the trending news search history objects
    useEffect(() => {
        // GET everyone's search histories from the database
        fetch("/api/databaseRoutes/recall", {
            method: "get"
        })
            .then(response => response.json())
            .then(data => {
                setFullSearchHistoryObject(data);
            });

        // GET the user's search histories from the database
        fetch("/api/databaseRoutes/recall/" + props.currentUsername, {
            method: "get"
        })
            .then(response => response.json())
            .then(data => {
                setUserSearchHistoryObject(data);
            });
    }, [])
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
        // If they aren't blank, proceed with the two nested routes...
        if (stateOfTheStates.unitedStateSelected !== "" && newsSearchEntry !== "") {

            // This fetch API call is going to the NYTimes and getting news articles
            fetch("/api/externalRoutes/news/" + stateOfTheStates.unitedStateSelected + "/" + newsSearchEntry)
                .then(res => res.json())
                .then(
                    (result) => {
                        // setIsLoaded(true);
                        // setData(result);

                        // Setting the newsResultObject, which consists of
                        // ALL the returned news articles
                        setNewsResultObject(result)

                        // Setting the mostRecentSearch object, which consists of
                        // The most recent search, which is displayed on the page for record
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
                        // console.log(error)
                    }
                )

            // POST the most recent search and user information to the database
            fetch("/api/databaseRoutes/store", {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    unitedState: stateOfTheStates.unitedStateSelected,
                    newsSearch: newsSearchEntry,
                    user: props.currentUsername
                })
            })

            // GET everyone's search histories from the database
            fetch("/api/databaseRoutes/recall", {
                method: "get"
            })
                .then(response => response.json())
                .then(data => {
                    setFullSearchHistoryObject(data);
                });

            // GET the user's search histories from the database
            fetch("/api/databaseRoutes/recall/" + props.currentUsername, {
                method: "get"
            })
                .then(response => response.json())
                .then(data => {
                    setUserSearchHistoryObject(data);
                });
        }
    }
    // =================================================================
    return (
        <Router>

            <ThemeProvider theme={theme}>

                <div className="App" style={{ width: '100%' }}>
                    <Box display="flex" p={1}>
                        <Box p={1} flexShrink={1} flexGrow={1}>

                            <div className={classes.root}>
                                <CssBaseline />

                                <Container maxWidth="xl" className={classes.container}>
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Header />
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={2} justify="center">
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
                                            <Grid container spacing={2} justify="center" alignItems="center" style={{ marginTop: '0px' }}>
                                                <Card className={classes.card} variant="outlined">

                                                    <CardContent>

                                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                                            State Information
                                                            </Typography>

                                                        {/* Ternary Operator to determine whether or not to display the state flag */}
                                                        {stateOfTheStates.abbreviation ? (<img className={classes.cover} src={process.env.PUBLIC_URL + '/localStateFlags/' + stateOfTheStates.abbreviation + '.svg'} />) : (<div></div>)}

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
                                                                <ForeverFactDisplay usStateInformation={stateOfTheStates} usstateAbbrev={stateOfTheStates.abbreviation} />
                                                            </Route>
                                                        </Switch>
                                                    </CardContent>

                                                </Card>

                                            </Grid>



                                            {/* RECTANGLE 3.5 - Trending News Display  */}
                                            <Grid container spacing={2} justify="center" alignItems="center">
                                                <Card className={classes.card} variant="outlined" style={{ marginTop: 10, marginBottom: 10, height: '220px', width: '300px' }}>
                                                    <CardContent>
                                                        <Typography className={classes.typography} variant="h6" style={{ fontWeight: "bold" }}>
                                                            Trending News
                                                    </Typography>
                                                        <TrendingNewsCard fullsearch={fullSearchHistoryObject} usersearch={userSearchHistoryObject} />
                                                    </CardContent>
                                                </Card>
                                            </Grid>

                                            {/* RECTANGLE 4 - News Search and Display */}
                                            <Grid container spacing={2} justify="center" alignItems="center">
                                                <Card className={classes.card} variant="outlined">
                                                    <CardContent variant="outlined">
                                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                                            Search By Topic
                                                        </Typography>
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
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </div>

                            <BottomNavigation className={classes.footer}>
                                Potential Footer
                            </BottomNavigation>

                        </Box>
                    </Box>
                </div>
            </ThemeProvider>

        </Router >
    );
}

export default Home;
