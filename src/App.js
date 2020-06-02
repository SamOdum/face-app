import React, { createContext, useEffect, useReducer } from 'react';
import Particles from 'react-particles-js';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';

export const AuthContext = createContext();

const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SIGNUP':
			localStorage.setItem('user', JSON.stringify(action.payload.data.user));
			localStorage.setItem('token', JSON.stringify(action.payload.data.token));
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.data.user,
				token: action.payload.data.token,
			};
		case 'LOGIN':
			localStorage.setItem('user', JSON.stringify(action.payload.data.user));
			localStorage.setItem('token', JSON.stringify(action.payload.data.token));
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.data.user,
				token: action.payload.data.token,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
};

const particlesObject = {
	particles: {
		number: {
			value: 50,
		},
		size: {
			value: 3,
		},
	},
	interactivity: {
		events: {
			onhover: {
				enable: true,
				mode: 'repulse',
			},
		},
	},
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		const token = JSON.parse(localStorage.getItem('token'));

		if (user && token) {
			dispatch({
				type: 'LOGIN',
				payload: {
					data:{user,
					token,}
					
				},
			});
		}
	}, []);
	
	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
			}}>
			<Particles params={particlesObject} className='particles' />
			<Router>
				<Header />
				<div className='App'>
					{!state.isAuthenticated ? <Login /> : <Home />}
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
