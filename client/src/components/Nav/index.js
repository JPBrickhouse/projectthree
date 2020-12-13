// import React from "react";
// import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// // import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography"

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

class Nav extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    // console.log('logging out');
    axios
      .post('/api/user/logout')
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch((error) => {
        // console.log('Logout error');
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const currentUsername = this.props.currentUsername;
    // console.log('navbar render, props: ');
    // console.log(this.props);

    return (
      <div>
        <header className='navbar App-header' id='nav-container'>
          <AppBar position="static" style={{ background: "#457b9d" }}>
            <Toolbar>

              {/* Title of the App */}
              <Typography variant="h3">
                Simple State
              </Typography>

              {/* Tagline of the App */}
              <Typography variant="h6">
                "No Alternatives - Just Facts"
              </Typography>

              <div className='col-4'>

                {/* Ternary operator, checking if the user is logged in
                If logged in, display the currentUsername and a logout button
                If not logged in, display nothing */}
                {loggedIn ? (
                  <div>
                    {/* Tagline of the App */}
                    <Typography variant="body1" style={{ display: 'flex-end' }}>
                      Hello {currentUsername}!
                    </Typography>

                    {/* Logout Button */}
                    <button>
                      <section className='navbar-section'>
                        <Link
                          to='#'
                          className='btn btn-link text-secondary'
                          onClick={this.logout}
                        >
                          <span className='text-secondary'>Logout!</span>
                        </Link>
                      </section>
                    </button>
                  </div>
                ) : (
                    <div></div>
                  )}

              </div>

            </Toolbar>
          </AppBar>
        </header>
      </div>
    );
  }
}

export default Nav;
