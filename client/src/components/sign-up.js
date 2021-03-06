import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const styles = {
	backgroundContainer: {
		backgroundImage: `url(${process.env.PUBLIC_URL + '/images/usflag.jpg'})`,
		border: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		minHeight: '100vh',
	}
}

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

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
		// console.log('sign-up handleSubmit, username: ')
		// console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/api/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				// console.log(response)
				if (!response.data.errmsg) {
					// console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					// console.log('username already taken')
				}
			}).catch(error => {
				// console.log('signup error: ')
				// console.log(error)

			})
	}


	render() {
		return (
			<div style={styles.backgroundContainer}>

				<div className="SignupForm" >

					{/* Signup Form */}
					<h2 style={{ display: 'flex', justifyContent: 'center' }}>Sign up!</h2>
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
								type="submit"
							>Sign up</button>
						</div>
					</form>
				</div>
				<br />
				<div style={{ display: 'flex', justifyContent: 'center' }}>Already signed up?</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					{/* Link that will direct you to log in! */}
					<Link to='/login' className='btn btn-link text-secondary'>
						<div>
							<span className='text-secondary'>Log in here!</span>
						</div>
					</Link>
				</div>

			</div>
		)
	}
}

export default Signup
