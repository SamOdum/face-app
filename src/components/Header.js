import React, { useContext } from 'react';
import { AuthContext } from '../App';

export const Header = () => {
	const { state, dispatch } = useContext(AuthContext);
	return (
		<nav id='navigation'>
			<h1 href='#' className='logo'>
				Face/App
			</h1>
			<button
				onClick={() =>
					dispatch({
						type: 'LOGOUT',
					})
				}>
				{state.isAuthenticated && (
					<h1 className='btn-txt'>Hi {state.user.firstName} (LOGOUT)</h1>
				)}
			</button>
		</nav>
	);
};

export default Header;
