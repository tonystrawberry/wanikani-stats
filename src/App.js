import React, { Component } from 'react';
import './styles/App.scss';
import Navbar from './components/Navbar';
import LevelProgressions from './components/LevelProgressions';
import LearnedKanjis from './components/LearnedKanjis';

class App extends Component {
  constructor() {
    super()
  }

  render(){
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <LevelProgressions />
        <LearnedKanjis />
      </React.Fragment>
    )
  }
}

export default App;
