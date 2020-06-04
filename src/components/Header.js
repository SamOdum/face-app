import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
				<Link to='/'
				onClick={handleClick}>
				Face/App
				</Link> 
			</span>
			{state.isAuthenticated 
			&& (<button
				onClick={handleClick} className='btn-txt'>
				Log out
			</button>)}
			
		</nav>
	);
};

export default Header;
