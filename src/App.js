import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.scss';
import Main from './components/Main';
import Header from './components/Header'

function App(props) {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main />
      </div>
    </Router>
  );
}

export default App;
