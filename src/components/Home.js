import React, {
	createContext,
	useContext,
} from 'react';
import { AuthContext } from '../App';
import Brain from './Brain';

export const SongContext = createContext();

export const Home = () => {
	const { state: authState } = useContext(AuthContext);
	return (
		<div className="home container">
			<h1>Welcome {authState.user}</h1>
			<p>Would you like to give FaceApp a whirl?</p>
			<Brain />
		</div>
		
	)
};

export default Home;
