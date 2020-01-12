import React from 'react'
import InfoBar from './InfoBar'
import ImageContainer from './ImageContainer'

function SearchForm() {
    return (
        <section className='App-search-section'>
            <InfoBar />
            <form className='App-search-section-form'>
                <input type='text' name='search' placeholder='Paste or type image URL...'/>
                <button>Submit</button> 
            </form>
            <ImageContainer />
        </section>
    )
}

export default SearchForm
