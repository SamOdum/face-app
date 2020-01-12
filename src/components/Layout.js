import React from 'react'
import {Route, Switch} from 'react-router-dom'
import SearchForm from './SearchForm'
// import ImageContainer from './ImageContainer'
// import LoginForm from './LoginForm'
import Welcome from './Welcome'
import IndexFormContainer from './IndexFormContainer'

function Layout() {
    return (
        <React.Fragment>
         <Switch>
                <Route exact path='/'>
                    <Welcome />
                </Route> 
                <Route path='/signin'>
                    <IndexFormContainer />
                </Route> 
                <Route path='/dashboard'>
                    <SearchForm />
                </Route> 
            </Switch>
        </React.Fragment>
    )
}

export default Layout
