import React, { Component } from 'react';

class Navbar extends Component {
  render(){
    return (
      <div className="header">
        <img src="https://docs.api.wanikani.com/images/logo-wanikani.png"></img>
        <h1>WANIKANI STATS</h1>
      </div>
    )
  }
}

export default Navbar;