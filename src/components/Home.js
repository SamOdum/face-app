import React, {
	// Fragment,
	createContext,
	useEffect,
	useContext,
	useReducer,
	// useState,
} from 'react';
import { AuthContext } from '../App';
import Login from './Login';
import Brain from './Brain';
// import Card from './Card';
// import AddSong from './AddSong';

export const SongContext = createContext();

const initialState = {
	picture: [],
	isFetching: false,
	hasError: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_FACE_REQUEST':
			return {
				...state,
				isFetching: true,
				hasError: false,
			};
		case 'FETCH_FACE_SUCCESS':
			return {
				...state,
				isFetching: false,
				picture: action.payload,
			};
		case 'FETCH_FACE_FAILURE':
			return {
				...state,
				hasError: true,
				isFetching: false,
			};
		default:
			return state;
	}
};

export const Home = () => {
	const { state: authState } = useContext(AuthContext);
	const [state, dispatch] = useReducer(reducer, initialState);
	// const [isAddSongModalVisible, setAddSongModalVisibility] = useState(false);

	// const toggleAddSong = () => {
	// 	setAddSongModalVisibility(!isAddSongModalVisible);
	// };

	useEffect(() => {
		dispatch({
			type: 'FETCH_FACE_REQUEST',
		});
		fetch('https://hookedbe.herokuapp.com/api/songs', {
			// MAKE CALL TO CLARIFY API HERE
			headers: {
				Authorization: `Bearer ${authState.token}`,
			},
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw res;
				}
			})
			.then(resJson => {
				dispatch({
					type: 'FETCH_FACE_SUCCESS',
					payload: resJson,
				});
			})
			.catch(error => {
				console.log(error);
				dispatch({
					type: 'FETCH_FACE_FAILURE',
				});
			});
	}, [authState.token]);

	// return (
	// 	<div className='home'>
	// 		{state.isFetching ? (
	// 			<span className='loader'>LOADING...</span>
	// 		) : state.hasError ? (
	// 			<span className='error'>AN ERROR HAS OCCURED</span>
	// 		) : (
	// 			<h1>Welcome home</h1>
	// 		)}
	// 	</div>
	// );
	return (
		<div className="home container">
			<h1>Welcome {authState.user}</h1>
			<p>Would you like to give FaceApp a whirl?</p>
			<Brain />
		</div>
		
	)
};

export default Home;
