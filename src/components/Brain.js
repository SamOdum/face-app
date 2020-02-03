import React, { useState } from 'react';
import Clarifai from 'clarifai';
import logo from '../logo.svg';
import dotenv from 'dotenv';
import clarifaiApiKey from '../config';

dotenv.config();
const app = new Clarifai.App({
	apiKey: clarifaiApiKey,
});

export const Brain = () => {
	const initialState = {
		url: '',
		isSubmitting: false,
		onething: true,
		errorMessage: null,
	};

	const faceBox = {
		position: "absolute",
		// backgroundColor: "red",
		zIndex: "10",
		border: "",
		top: "",
		left: "",
		bottom: "",
		right: "",
	};

	const [data, setData] = useState(initialState);
	const [coord, setCoord] = useState(faceBox)

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

    const handleFormSubmit = event => {
		event.preventDefault();
		setData({...data, isSubmitting: true,});
	app.models.predict("a403429f2ddf4b49b307e318f00e528b", data.url).then(
    (response) => {
	  // do something with response
	  const concepts = response['outputs'][0]['data']['regions'][0]['region_info']['bounding_box'];
		const img = document.querySelector('#brain-image');
		const width = Number(img.width);
		const height = Number(img.height);
		setCoord({
			...coord,
			border: '2px solid white',
			top: `${concepts.top_row * height}px`,
			left: `${concepts.left_col * width}px`,
			bottom: `${height - (concepts.bottom_row * height)}px`,
			right: `${width - (concepts.right_col * width)}px`,
			
		});
		setData({...data, isSubmitting: false,});

	})
	.catch(err=>{
	  setData({
			...data,
			isSubmitting: false,
			errorMessage: err.message || err.statusText,
		});
	})	
	} 

    return (
        <div className='brain-container'>
			<form 
				onSubmit={handleFormSubmit} 
				className='form'
			>
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
						<span className='spinner2' src={logo} alt='loading icon' >o</span>
					) : (
						"Let's go!"
					)}
				</button>
			</form>
			<div className='brain-image-container'>
				<div style={coord}></div>
				<img src={data.url} alt="" id="brain-image"/>
			</div>
		</div>
	)
}

export default Brain