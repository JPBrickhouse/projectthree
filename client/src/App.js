import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";

// Importing Navbar component
import Nav from "./components/Nav";

// Importing the MAP (Covid19) component
import Covid19 from "./components/Covid19";
// Importing the ApiCall component (which gets the Covid19 data [cases, etc.])
import ApiCall from "./components/ApiCall/ApiCall"
// Importing the SenatorApiCall component (which gets the senator data [name, party, twitter account])
import SenatorApiCall from "./components/SenatorApiCall/SenatorApiCall"
// Importing the SearchBar component
import SearchBar from "./components/SearchBar/SearchBar"
// Importing the SearchButton component
import SearchButton from "./components/SearchButton/SearchButton"
// Importing the QuickSearchButton component
import QuickSearchButton from "./components/QuickSearchButton/QuickSearchButton"


// =================================================================

function App() {
  // ---------------------------------------------------------------
  // State elements and objects with Hooks
  const [stateOfTheStates, setStateOfTheStates] = useState({
    unitedStateSelected: "",
    regionSelected: "",
    abbreviation: "",
  })

  const [newsSearchEntry, setNewsSearchEntry] = useState()
  // ---------------------------------------------------------------
  // A function – to be passed down – that will run when the map is clicked
  // It will update the state object and list which United State was most recently clicked
  const gettingTheMapClick = (unitedState, region, abbrev) => {
    setStateOfTheStates({
      unitedStateSelected: unitedState,
      regionSelected: region,
      abbreviation: abbrev,
    })
  }
  // ---------------------------------------------------------------
  // A function - to be passed down - that will run any time the content in the
  // SearchBar component registers an onChange event. As such, it will update
  // the state of newsSearchEntry
  const handleInputChange = (event) => {
    setNewsSearchEntry(event.target.value)
  }
  // ---------------------------------------------------------------
  // A function - to be passed down - that will run any time a quick search button
  // is clicked and will update the state of newsSearchEntry to be whatever the
  // value of the quick search button is set to. 
  const handleQuickSearch = (event) => {
    setNewsSearchEntry(event.target.value)
  }
  // ---------------------------------------------------------------


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newsSearchEntry)
  }
  // ---------------------------------------------------------------
  return (
    <Router>
      <div>
        <Nav />
        {/* The MAP component (called "Covid19", passing down the gettingTheMapClick function as a prop  */}
        <Covid19 mapClick={gettingTheMapClick} />

        {/* The ApiCall component, which makes an ajax call to the Covid Data API, and displays relevant case data.
        Passing down the unitedStateSelected as a prop */}
        <ApiCall usstateAbbrev={stateOfTheStates.abbreviation} />

        {/* The SenatorApiCall component, which makes an ajax call to the Pro Publica API, and displays relevant state senator data.
        Passing down the unitedStateSelected as a prop */}
        <SenatorApiCall usstateAbbrev={stateOfTheStates.abbreviation} />

        {/* The SearchBar component, which is a simple input form. Passing down the
        handleInputChange function as a prop with onChange, so any change
        will run the handleInputChange function */}
        <SearchBar onChange={handleInputChange} />

        {/* The SearchButton component, which is a simple button. Passing down the
        handleSubmit function as a prop with onClick, so any button click will
        run the handleSubmit function */}
        <SearchButton onClick={handleSubmit} />

        {/* Quick search buttons. Any click will run the handle quick search function, which
        in turn will set the news search entry */}
        <QuickSearchButton onClick={handleQuickSearch} value="Covid" />
        <QuickSearchButton onClick={handleQuickSearch} value="News" />

        {/* Temporary div, just to show that content is being acquired from clicks / submits */}
        <div>
          <p>{stateOfTheStates.unitedStateSelected}</p>
          <p>{stateOfTheStates.regionSelected}</p>
          <p>{stateOfTheStates.abbreviation}</p>
        </div>


        {/* <Nav /> */}
        {/* <Switch>
          <Route exact path={["/", "/books"]}>
            <Books />
          </Route>
          <Route exact path="/books/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch> */}

      </div>
    </Router>
  );
}

export default App;
