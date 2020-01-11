import React from 'react'

function Login() {
    return (
        <form className='App-homepage-form'>
            <input type='text' placeholder='Email' name='Email' />
            <input type='password' placeholder='password' name='password' />
            <button>LogIn</button>
        </form>
    )
}

export default Login

