import React, { useContext } from 'react';
import { AuthContext } from '../App';

export const Header = () => {
	const { state, dispatch } = useContext(AuthContext);
	const handleClick = () =>
					dispatch({
						type: 'LOGOUT',
					})
	return (
		<nav id='navigation'>
			<span className='logo'>
				Face/App
			</span>
			{state.isAuthenticated 
			&& <button
				onClick={handleClick} className='btn-txt'>
				Log out
			</button>}
			
		</nav>
	);
};

export default Header;
