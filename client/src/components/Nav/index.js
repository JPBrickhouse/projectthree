// import React from "react";
// import Button from "@material-ui/core/Button";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";


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
          <AppBar position="static" style={{ background: "#457b9d", boxShadow: 'none', flexGrow: '1' }}>
            <Toolbar>

              {/* Title of the App */}
              <Typography variant="h4" component="h3">
                <Link to="/">
                  Simple State
                </Link>
              </Typography>

              {/* Tagline of the App */}
              <Typography variant="body1">
                "No Alternatives - Just Facts"
              </Typography>


              <div
                style={{ marginLeft: '18px', justifyContent: 'flex-end', alignItems: 'flex-end', flexGrow: '1' }}
              >
                {/* Ternary operator, checking if the user is logged in
                If logged in, display the currentUsername and a logout button
                If not logged in, display nothing */}
                {loggedIn ? (
                  <div >
                    {/* Tagline of the App */}
                    <Typography variant="body2"
                    >
                      Hello {currentUsername}!
                    </Typography>

                    {/* Logout Button */}
                    <Button size="small" color="secondary">
                      {/* <section className='navbar-section'> */}
                      <Link
                        to='#'
                        className='btn btn-link text-secondary'
                        onClick={this.logout}
                      >
                        <span className='text-secondary'>Logout!</span>
                      </Link>
                      {/* </section> */}
                    </Button>
                  </div>
                ) : (
                    <div></div>
                  )}
              </div>

              {/* Link to the "About Us" route and page */}
              <div>
                <Button size="small" color="secondary"
                >
                  <Link to="/aboutTheTeam">Meet the Developers!</Link>
                </Button>
              </div>

            </Toolbar>
          </AppBar>
        </header>
      </div>
    );
  }
}

export default Nav;
