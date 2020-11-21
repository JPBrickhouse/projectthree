import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// Importing the Covid19 component
import Covid19 from "./components/Covid19";

function App() {
  return (
    <Router>
      <div>

        <Covid19 />



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
