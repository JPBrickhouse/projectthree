import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// Importing the Covid19 component
import Covid19 from "./components/Covid19";

function App() {

  // State object with Hooks
  const [stateOfTheStates, setStateOfTheStates] = useState({
    unitedStateSelected: "",
    regionSelected: ""
  })

  // A function – to be passed down – that will run when the map is clicked
  // It will update the state object and list which United State was most recently clicked
  const gettingTheMapClick = (unitedState, region) => {
    setStateOfTheStates({
      unitedStateSelected: unitedState,
      regionSelected: region
    })
  }


  return (
    <Router>
      <div>

        {/* Covid19 Component, passing down the gettingTheMapClick function as a prop  */}
        <Covid19 mapClick={gettingTheMapClick} />

        {/* Temporary div, just to show the United State most recently clicked */}
        <div>
          {stateOfTheStates.unitedStateSelected}
          {stateOfTheStates.regionSelected}
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
