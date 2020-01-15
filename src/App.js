import React, { createContext, useEffect, useReducer } from 'react';
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
		case 'LOGIN':
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			localStorage.setItem('token', JSON.stringify(action.payload.token));
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				token: action.payload.token,
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

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		const token = JSON.parse(localStorage.getItem('token'));

		if (user && token) {
			dispatch({
				type: 'LOGIN',
				payload: {
					user,
					token,
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
