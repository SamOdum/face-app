import React, { useContext, useEffect, useState } from 'react';
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
	
	// Face bounding box
let faceBoxStyle;
useEffect(()=>{
		const faceBox = {
		position: "absolute",
		left: "20px",
		top: "20px",
		/* background-color: red, */
		zIndex: "10",
		width: "50px",
		height: "50px",
		border: "2px solid white",
	}

	faceBoxStyle = data.url ? faceBox : '';
}, [])
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
                                </form><div className='brain-image-container'><div style={{faceBoxStyle}}></div><img src={data.url} alt=""/></div></div>)}

                                export default Brain