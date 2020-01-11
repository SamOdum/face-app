import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className='App-navbar'>
            <ul>
                <li><Link to='/signin'>Sign In</Link></li> 
            </ul>
        </nav>
    )
}

export default Navbar
