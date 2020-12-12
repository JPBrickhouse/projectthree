import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

const styles = {
    backgroundContainer: {
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/washdc.jpg'})`,
        border: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '120vh',
    }
}

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/api/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div style={styles.backgroundContainer}>

                    <div>

                        {/* Login Form */}
                        <h2 style={{ display: 'flex', justifyContent: 'center' }}>Login</h2>
                        <form className="form-horizontal">

                            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="username">Username</label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input className="form-input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="password">Password: </label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input className="form-input"
                                        placeholder="password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="col-7"></div>
                                <button
                                    className="btn btn-primary col-1 col-mr-auto"

                                    onClick={this.handleSubmit}
                                    type="submit">Login</button>
                            </div>
                        </form>

                        <br />

                        <div style={{ display: 'flex', justifyContent: 'center' }}>Need to sign up?</div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* Link that will direct you to sign up! */}
                            <Link to='/signup' className='btn btn-link'>
                                <div>
                                    <span className='text-secondary'>Sign up here!</span>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            )
        }
    }
}

export default LoginForm
