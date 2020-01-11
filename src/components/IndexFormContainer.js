import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import Login from './Login'
import Register from './Register'

function IndexFormContainer() {
    return (
        <Router>
            <div className='App-form-container'>
                <h2 className='App-heading-text'>Welcome</h2>
                <nav className='App-form-nav'>
                    <ul>
                        <li><NavLink to='/register'>Register</NavLink></li>
                        <li><NavLink to='/signin'>LogIn</NavLink></li>
                    </ul>
                </nav>
                    <Switch>
                        <Route path='/signin'>
                            <Login />
                        </Route>
                        <Route exact path='/register'>
                            <Register />
                        </Route>
                    </Switch>
            </div>
        </Router>
    )
}

export default IndexFormContainer
