import React from 'react'
import SearchForm from './SearchForm'
// import ImageContainer from './ImageContainer'
import Layout from './Layout'

function Main(props) {
  const isLoggedIn = true;
    return (
        <div className='App-main'>
            {isLoggedIn ? <SearchForm /> : <Layout>{props.children}</Layout>}
        </div>
    )
}

export default Main
