import React, { useContext, useState } from 'react';
import logo from '../logo.svg';
import { AuthContext } from '../App';

export const Brain = () => {
	const { dispatch } = useContext(AuthContext);
	const initialState = {
		url: '',
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
        <div className='brain-container'>
<form onSubmit={handleFormSubmit} className='form'>
									<input
										type='text'
										value={data.url}
										onChange={handleInputChange}
										name='url'
                                        id='url'
                                        placeholder='Enter image url here...'
									/>
                                
                                <button disabled={data.isSubmitting}>
									{data.isSubmitting ? (
										<img className='spinner' src={logo} alt='loading icon' />
									) : (
										"Let's go!"
									)}
								</button>
                                </form><div><img src={data.url} alt="loaded image"/></div></div>)}

                                export default Brain