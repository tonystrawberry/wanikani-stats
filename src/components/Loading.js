import React, { Component } from 'react';
import loading from '../images/loading.gif' // relative path to image 

class Loading extends Component {

  constructor() {
    super()
  }

  render(){
    return (
      <img src={loading}></img>
    )
  }
}

export default Loading;