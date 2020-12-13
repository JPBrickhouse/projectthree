
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import Nav from "./components/Nav";
import Home from "./Home"

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios
      .get('/api/user/')
      .then((response) => {
        // console.log('Get user response: ');
        // console.log(response.data);
        if (response.data.user) {
          // console.log('Get User: There is a user saved in the server session: ');

          this.setState({
            loggedIn: true,
            username: response.data.user.username,
          });
        } else {
          // console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch((err) => {
        // console.log('err', err)
      });
  }

  render() {
    return (
      <Router>
        <div className='App'>

          {/* Title / Navigation Bar, which always appears */}
          <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} currentUsername={this.state.username} />

          {/* Routes to different components */}
          <Switch>

            {/* If the user attempts to route to the "/" route, a ternary operator checks
            if the user is logged in or not. If the user is logged in, it serves the
            <Home/> page. If the user is not logged in, it serves the <LoginForm/> page */}
            <Route exact path='/' render={() =>
              this.state.loggedIn ? (<Home currentUsername={this.state.username}/>) : (<LoginForm updateUser={this.updateUser} />)} />

            {/* The login route and page */}
            <Route
              path='/login'
              render={() => <LoginForm updateUser={this.updateUser} />}
            />

            {/* The signup route and page */}
            <Route path='/signup' render={() => <Signup />} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
