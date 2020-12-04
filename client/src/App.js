// Importing React and useState Hooks from react
import React, { useState } from "react";

// Importing styles from Material-ui
import { makeStyles, ThemeProvider, createMuiTheme, styled } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { blue, purple } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

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

// Importing the SearchBar component
import SearchBar from "./components/SearchBar/SearchBar"

// Importing the SearchButton component
import SearchButton from "./components/SearchButton/SearchButton"

// Importing the ForeverFactButton component
import ForeverFactButton from "./components/ForeverFactButton/ForeverFactButton"


import BtnGrp from "./components/ButtonGroup/index"
import { FormHelperText } from "@material-ui/core";


// =================================================================

function App() {
  // Material UI theme constant
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: purple[500]
      }
    }
  })
  // useStyles const for beginning styles
  const useStyles = makeStyles((theme) => ({
    grid: {
      width: '100%',
      margin: '0px'
    },
    card: {
      // width: '100%',
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: 'linear-gradient(45deg, #F1FAEE, #A8DADC)',
      marginTop: 25,
      marginBottom: 25,
      boxShadow: '#1D3557',
      color: '#1D3557',
      padding: '5px 30px'
    },
    root: {
      minHeight: '100vh',
      border: 0
    }
  }))

  const FactsButton = styled(Button)({
    background: 'linear-gradient(45deg, #A8DADC 30%, #457B9D 90%)',
    border: 0,
    borderRadius: 3,
    marginTop: 15,
    boxShadow: '0 3px 5px 2px #E63946',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
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




    // ON CLICK
    // POST the following to the database: stateOfTheStates and newsSearchEntry
    // (Storing the user's search history)
  }


  // ---------------------------------------------------------------
  // A function - to be passed down - that will run any time a quick search button
  // is clicked and will update the state of newsSearchEntry to be whatever the
  // value of the quick search button is set to. 
  // const foreverFacts = (event) => {
  //   console.log(event.target.value)
  // }



  // =================================================================
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <div className={classes.root}>

            {/* -------------------------------------------------------------- */}
            {/* Permanent Nav Bar always exists at the top of the page */}
            <Nav />

            {/* -------------------------------------------------------------- */}
            {/* RECTANGLE 1 - Map component */}

            {/* The MAP component (called "Covid19", passing down the gettingTheMapClick function as a prop  */}
            <div className={classes.card}>
              <Covid19 mapClick={gettingTheMapClick} />
            </div>
            {/* -------------------------------------------------------------- */}
            {/* RECTANGLE 2 - Forever Fact Buttons */}
            <BtnGrp />
            {/* Forever fact buttons. Clicking the buttons will activate the router switch.
            This will route to the relevant display, which will contain relevant forever facts.
            Wrapping buttons with router links: https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
            This solution is entirely valid HTML, but still "works", and here's essentially what is happening:
            We're creating a link (equivalent to <a>), and then button a button "inside" that link
            Per this stackoverflow thread, you nest most things inside <a> tags, but not everything:
            https://stackoverflow.com/questions/6393827/can-i-nest-a-button-element-inside-an-a-using-html5/6393863#6393863 */}

            {/* <Grid spacing={2} justify="flex-start" align-items="flex-start" container xs={12} sm={12} md={8} lg={8} xl={8}>
              <ButtonGroup variant="contained">
                <FactsButton
                  size="large"
                  style={{
                    height: 100,
                    width: '95%',
                    fontSize: 20
                  }}
                  color="primary"
                >
                  <Link to="/covidforeverfact">
                    <ForeverFactButton onClick={foreverFacts} value="covid" />
                  </Link>
                </FactsButton>
                <FactsButton
                  size="large"
                  style={{
                    height: 100,
                    width: '95%',
                    fontSize: 20
                  }}
                  color="primary"
                >
                  <Link to="/senatorforeverfact">
                    <ForeverFactButton onClick={foreverFacts} value="senator" />
                  </Link>
                </FactsButton>
                <FactsButton
                  size="large"
                  style={{
                    height: 100,
                    width: '95%',
                    fontSize: 20
                  }}
                  color="primary"
                >
                  <Link to="/generalforeverfact">
                    <ForeverFactButton onClick={foreverFacts} value="general" />
                  </Link>
                </FactsButton>
              </ButtonGroup>
            </Grid> */}

            {/* <Link to="/covidforeverfact">
              <ForeverFactButton onClick={foreverFacts} value="covid" />
            </Link>
            <Link to="/senatorforeverfact">
              <ForeverFactButton onClick={foreverFacts} value="senator" />
            </Link>
            <Link to="/generalforeverfact">
              <ForeverFactButton onClick={foreverFacts} value="general" />
            </Link> */}
            {/* -------------------------------------------------------------- */}
            {/* RECTANGLE 3 - Forever Fact DISPLAY */}

            {/* Router switch so that when the Fact Buttons are clicked, the route switches to the corresponding component */}
            <Grid className={classes.card} spacing={2} justify="flex-start" align-items="flex-start" container xs={12} sm={12} md={2} lg={2} xl={2}>
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

                </Route>
              </Switch>
            </Grid>
            {/* -------------------------------------------------------------- */}
            {/* RECTANGLE 4 - News Search and Display */}

            {/* The SearchBar component, which is a simple input form. Passing down the
        handleInputChange function as a prop with onChange, so any change
        will run the handleInputChange function */}
            <Grid className={classes.card} style={{ paddingLeft: 25, alignContent: 'center' }} container xs={12} sm={12} md={2} lg={2} xl={2}>
              <SearchBar onChange={handleNewsInputChange} />

              {/* The SearchButton component, which is a simple button. Passing down the
        handleSubmit function as a prop with onClick, so any button click will
        run the handleSubmit function */}
              <SearchButton onClick={handleNewsSubmit} />

              {/* The NewsDisplay, which takes the news articles from the New York Times and displays them */}
              <NewsDisplay newsResultProp={newsResultObject} />
            </Grid>



            {/* -------------------------------------------------------------- */}
          </div>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
