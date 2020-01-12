import React from 'react'
import {Link} from 'react-router-dom'

function Login() {
    return (
        <form className='App-homepage-form'>
            <input type='text' placeholder='Email' name='Email' />
            <input type='password' placeholder='password' name='password' />
            <button>LogIn</button>
            <Link to='/signin' className='App-form-link'>Forgot password?</Link>
        </form>
    )
}

export default Login

