import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';

import axios from 'axios';

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
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
    // console.log('navbar render, props: ');
    // console.log(this.props);

    return (
      <div>
        <header className='navbar App-header' id='nav-container'>
          <div className='col-4'>
            {loggedIn ? (
              <section className='navbar-section'>
                <Link
                  to='#'
                  className='btn btn-link text-secondary'
                  onClick={this.logout}
                >
                  <span className='text-secondary'>logout</span>
                </Link>
              </section>
            ) : (
                <section className='navbar-section'>
                  <Link to='/' className='btn btn-link text-secondary'>
                    <div>
                      <span className='text-secondary'>home</span>
                    </div>
                  </Link>
                  <Link to='/login' className='btn btn-link text-secondary'>
                    <div>
                      <span className='text-secondary'>login</span>
                    </div>
                  </Link>
                  <Link to='/signup' className='btn btn-link'>
                    <div>
                      <span className='text-secondary'>sign up</span>
                    </div>
                  </Link>
                </section>
              )}
          </div>
          <div className='col-4 col-mr-auto'>
            <div id='top-filler'></div>
            
            <h1 className='App-title'> SUCCESS IN PROGRESS</h1>
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;
