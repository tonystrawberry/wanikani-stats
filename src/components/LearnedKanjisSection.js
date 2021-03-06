import React, { Component } from 'react';
import '../styles/LearnedKanjis.scss';
import { connect } from 'react-redux';

import arrowDown from '../images/arrowDown.png'; // relative path to image 
import KanjiDetailsBox from './KanjiDetailsBox';

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
    var kanjisElements = [];
    for (var i = 0; i < this.props.kanjis.length; i++) {
      var id = this.props.kanjis[i].data.subject_id;
      var characterData = this.props.allKanjis.find(kanjiData => kanjiData.id == id);
      if (characterData != undefined) {
        var character = characterData.data.characters;
        var meanings = characterData.data.meanings;
        var readings = characterData.data.readings;
        kanjisElements.push(
          <div key={`kanjis-${this.props.srsClass}-${i}`} className="item">
            <span className={this.props.srsClass}>{character}</span>
            <KanjiDetailsBox srsClass={this.props.srsClass} kanjiCharacter={character} meanings={meanings} readings={readings} />
          </div>);
      }
    }
    return (
      <div className="-section">
        <h3 className={this.props.srsClass}>{this.props.status}</h3>
        <img className="-toggle" width="30" src={arrowDown} onClick={this.toggleVisibility} />
        <div className={`wrapper ${!this.state.visible ? '-hidden' : ''}`}>
          {kanjisElements}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allKanjis: state.kanjis.allKanjis
  }
};

export default connect(mapStateToProps, null)(LearnedKanjisSections);

