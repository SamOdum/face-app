import React, {
	useContext,
} from 'react';
import { AuthContext } from '../App';
import Brain from './Brain';

export const Home = () => {
	const { state: authState } = useContext(AuthContext);
	return (
		<div className="home container">
			<h1>Welcome {authState.user}</h1>
			<p>Input the url of a picture and click Let's Go!</p>
			<Brain />
		</div>
		
	)
};

export default Home;
