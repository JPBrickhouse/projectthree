// Importing React and useState Hooks from react
import React, { useState } from "react";

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

// =================================================================

function App() {
  // ---------------------------------------------------------------
  // State elements and objects with Hooks
  const [stateOfTheStates, setStateOfTheStates] = useState({
    unitedStateSelected: "",
    regionSelected: "",
    abbreviation: "",
    population: 0
  })

  const [newsSearchEntry, setNewsSearchEntry] = useState("")

  const [newsResultObject, setNewsResultObject] = useState({})
  // ---------------------------------------------------------------
  // A function – to be passed down – that will run when the map is clicked
  // It will update the state object with the United State was most recently clicked
  const gettingTheMapClick = (unitedState, region, abbrev, pop) => {
    setStateOfTheStates({
      unitedStateSelected: unitedState,
      regionSelected: region,
      abbreviation: abbrev,
      population: pop,
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
  const foreverFacts = (event) => {
    console.log(event.target.value)
  }



  // =================================================================
  return (
    <Router>
      <div>
        {/* -------------------------------------------------------------- */}
        {/* Permanent Nav Bar always exists at the top of the page */}
        <Nav />

        {/* -------------------------------------------------------------- */}
        {/* RECTANGLE 1 - Map component */}

        {/* The MAP component (called "Covid19", passing down the gettingTheMapClick function as a prop  */}
        <Covid19 mapClick={gettingTheMapClick} />
        {/* -------------------------------------------------------------- */}
        {/* RECTANGLE 2 - Forever Fact Buttons */}

        {/* Forever fact buttons. Clicking the buttons will activate the router switch.
        This will route to the relevant display, which will contain relevant forever facts.
        Wrapping buttons with router links: https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
        This solution is entirely valid HTML, but still "works", and here's essentially what is happening:
        We're creating a link (equivalent to <a>), and then button a button "inside" that link
        Per this stackoverflow thread, you nest most things inside <a> tags, but not everything:
        https://stackoverflow.com/questions/6393827/can-i-nest-a-button-element-inside-an-a-using-html5/6393863#6393863 */}
        <Link to="/covidforeverfact">
          <ForeverFactButton onClick={foreverFacts} value="covid" />
        </Link>
        <Link to="/senatorforeverfact">
          <ForeverFactButton onClick={foreverFacts} value="senator" />
        </Link>
        <Link to="/generalforeverfact">
          <ForeverFactButton onClick={foreverFacts} value="general" />
        </Link>
        {/* -------------------------------------------------------------- */}
        {/* RECTANGLE 3 - Forever Fact DISPLAY */}

        {/* Router switch so that when the Fact Buttons are clicked, the route switches to the corresponding component */}
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
        {/* -------------------------------------------------------------- */}
        {/* RECTANGLE 4 - News Search and Display */}

        {/* The SearchBar component, which is a simple input form. Passing down the
        handleInputChange function as a prop with onChange, so any change
        will run the handleInputChange function */}
        <SearchBar onChange={handleNewsInputChange} />

        {/* The SearchButton component, which is a simple button. Passing down the
        handleSubmit function as a prop with onClick, so any button click will
        run the handleSubmit function */}
        <SearchButton onClick={handleNewsSubmit} />

        {/* The NewsDisplay, which takes the news articles from the New York Times and displays them */}
        <NewsDisplay newsResultProp={newsResultObject} />



        {/* -------------------------------------------------------------- */}
      </div>
    </Router>
  );
}

export default App;
