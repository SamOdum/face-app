import React, { useContext, useState } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import logo from '../logo.svg';
import { AuthContext } from '../App';

export const Login = () => {
	const { dispatch } = useContext(AuthContext);
	const initialState = {
		email: '',
		password: '',
		isSubmitting: false,
		errorMessage: null,
	};

	const [data, setData] = useState(initialState);

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const handleFormSubmit = event => {
		event.preventDefault();
		setData({
			...data,
			isSubmitting: true,
			errorMessage: null,
		});
		fetch('http://localhost:5000/api/v1/auth/sign-in/', {
			//**Remember to implement .env here */
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				throw res;
			})
			.then(resJson => {
				dispatch({
					type: 'LOGIN',
					payload: resJson,
				});
			})
			.catch(error => {
				setData({
					...data,
					isSubmitting: false,
					errorMessage: error.message || error.statusText,
				});
			});
	};

	return (
		<div className='login-container'>
			<div className='card'>
				<div className='container'>
					<header>
						<NavLink to='/login'>Login</NavLink>
						<NavLink to='/sign-up'>Sign up</NavLink>
					</header>
					<Switch>
						<Route path='/login'>
							<form onSubmit={handleFormSubmit}>
								<label htmlFor='email'>
									Email Address
									<input
										type='text'
										value={data.email}
										onChange={handleInputChange}
										name='email'
										id='email'
									/>
								</label>

								<label htmlFor='password'>
									Password
									<input
										type='password'
										value={data.password}
										onChange={handleInputChange}
										name='password'
										id='password'
									/>
								</label>

								{data.errorMessage && (
									<span className='form-error'>{data.errorMessage}</span>
								)}

								<button disabled={data.isSubmitting}>
									{data.isSubmitting ? (
										<img className='spinner' src={logo} alt='loading icon' />
									) : (
										'Login'
									)}
								</button>
							</form>
						</Route>
						<Route path='/sign-up'>
							<form onSubmit={handleFormSubmit}>
								<label htmlFor='email'>
									Email Address
									<input
										type='text'
										value={data.email}
										onChange={handleInputChange}
										name='email'
										id='email'
									/>
								</label>

								<label htmlFor='password'>
									Password
									<input
										type='password'
										value={data.password}
										onChange={handleInputChange}
										name='password'
										id='password'
									/>
								</label>

								{data.errorMessage && (
									<span className='form-error'>{data.errorMessage}</span>
								)}

								<button disabled={data.isSubmitting}>
									{data.isSubmitting ? (
										<img className='spinner' src={logo} alt='loading icon' />
									) : (
										'Sign up'
									)}
								</button>
							</form>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Login;
