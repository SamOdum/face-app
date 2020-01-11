import React from 'react'
import {Route, Switch} from 'react-router-dom'
// import SearchForm from './SearchForm'
// import ImageContainer from './ImageContainer'
// import LoginForm from './LoginForm'
import Welcome from './Welcome'
import IndexFormContainer from './IndexFormContainer'

function Main() {
    return (
        <div className='App-main'>
            <Switch>
                <Route exact path='/'>
                    <Welcome />
                </Route> 
                <Route exact path='/signin'>
                    <IndexFormContainer />
                </Route> 
            </Switch>
        </div>
    )
}

export default Main
