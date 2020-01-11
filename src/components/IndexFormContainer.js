import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Login from './Login'
import Register from './Register'

function IndexFormContainer() {
    return (
        <Router>
            <div className='App-main-form-container'>
                <h2>Welcome to FaceApp</h2>
                <div>
                    <nav>
                        <ul>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/login'>Log In</Link></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route exact path='/register'>
                            <Register />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default IndexFormContainer
