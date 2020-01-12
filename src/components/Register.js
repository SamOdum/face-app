import React from 'react'

function Register() {
    return (
        <form className='App-homepage-form'>
            <input type='text' placeholder='Email' name='Email' />
            <input type='password' placeholder='password' name='password' />
            <button>Signup</button>
        </form>
    )
}

export default Register
