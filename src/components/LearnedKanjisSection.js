import React, { Component } from 'react';
import '../styles/LearnedKanjis.css';
import arrowDown from '../images/arrowDown.png'; // relative path to image 


class LearnedKanjisSections extends Component {

  constructor() {
    super();
    this.state = {
      visible: false
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility(){
    this.setState({visible: !this.state.visible});
  }

  render() {
    return (
      <div class="-section">
        <h3 class={this.props.srsClass}>{this.props.status}</h3>
        <img class="-toggle" width="30" src={arrowDown} onClick={this.toggleVisibility} />
        <div className={`wrapper ${!this.state.visible ? '-hidden' : ''}`}>
          {this.props.kanjisElements}
        </div>
      </div>
    )
  }
}

export default LearnedKanjisSections;

