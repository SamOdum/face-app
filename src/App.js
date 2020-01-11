import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';

function App(props) {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main>
          {props.children}
        </Main>
      </div>
    </Router>
  );
}

export default App;
