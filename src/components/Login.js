import React, { useContext, useState } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import logo from '../logo.svg';
import { AuthContext } from '../App';

export const Login = () => {
	const { dispatch } = useContext(AuthContext);
	const initialState = {
		email: '',
		password1: '',
		password2: '',
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

	const handleSignupFormSubmit = event => {
		event.preventDefault();
		setData({
			...data,
			isSubmitting: true,
			errorMessage: null,
		});
		fetch('http://localhost:5000/api/v1/auth/signup/', {
			//**Remember to implement .env here */
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password1: data.password1,
				password2: data.password2,
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
					type: 'SIGNUP',
					payload: resJson,
				});
			})
			.catch(error => {
				setData({
					...data,
					isSubmitting: false,
					errorMessage: error.status===400? 'Passwords must match' : error.message || error.statusText,
				});
			});
	};

// 	const handleSignupFormSubmit = async event => {
// 	event.preventDefault();
// 	setData({
// 		...data,
// 		isSubmitting: true,
// 		errorMessage: null,
// 	});
// 	const response = await fetch('http://localhost:5000/api/v1/auth/signup/', {
// 		//**Remember to implement .env here */
// 		method: 'post',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({
// 			email: data.email,
// 			password1: data.password1,
// 			password2: data.password2,
// 		}),
// 	});
// 	try{
// if (response.status === 400) return response.json();
// if (response.status === 201) {dispatch({type: 'SIGNUP', payload: response.json(),})}
// 	}catch(error){
// 				setData({
// 					...data,
// 					isSubmitting: false,
// 					errorMessage: error.message || error.statusText,
// 				});
// 	}
// }

	const handleLoginFormSubmit = event => {
		event.preventDefault();
		setData({
			...data,
			isSubmitting: true,
			errorMessage: null,
		});
		fetch('http://localhost:5000/api/v1/auth/login/', {
			//**Remember to implement .env here */
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: data.email,
				password1: data.password1,
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
					errorMessage: error.status === 400? 'Fill all fields correctly' : error.message || error.statusText,
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
							<form onSubmit={handleLoginFormSubmit}>
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

								<label htmlFor='password1'>
									Password
									<input
										type='password'
										value={data.password1}
										onChange={handleInputChange}
										name='password1'
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
							<form onSubmit={handleSignupFormSubmit}>
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

								<label htmlFor='password1'>
									Password
									<input
										type='password'
										value={data.password1}
										onChange={handleInputChange}
										name='password1'
										id='password'
									/>
								</label>

								<label htmlFor='password2'>
									Re-type Password
									<input
										type='password'
										value={data.password2}
										onChange={handleInputChange}
										name='password2'
										id='password2'
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
