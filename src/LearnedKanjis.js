import React, { Component } from 'react';
import Loading from './components/Loading';
import './LearnedKanjis.css';

class LearnedKanjis extends Component {

  constructor() {
    super()
  }

  render() {
    var kanjisElements = [];
    if (this.props.learnedKanjis != null & this.props.learnedKanjis.length > 0) {
      for (var i = 0; i < this.props.learnedKanjis.length; i++) {
        var id = this.props.learnedKanjis[i].data.subject_id;
        var srsStatus = this.props.learnedKanjis[i].data.srs_stage_name;
        var characterData = this.props.allKanjis.find(kanjiData => kanjiData.id == id);
        var srsClass = "";
        switch (srsStatus) {
          case "Initiate":
          case "Apprentice I":
          case "Apprentice II":
          case "Apprentice III":
          case "Apprentice IV":
            srsClass = "-apprentice";
            break;
          case "Guru I":
          case "Guru II":
            srsClass = "-guru";
            break;
          case "Master":
            srsClass = "-master";
            break;
          case "Enlightened":
            srsClass = "-enlightened";
            break;
          case "Burned":
            srsClass = "-burned";
            break;


        }

        if (characterData != undefined) {
          var character = characterData.data.characters;
          kanjisElements.push(<div class="item"><span class={srsClass}>{character}</span></div>)
        }

      }

      return (
        <div class='section' id='learnedKanjis'>
          <h2>Learned Kanjis</h2>
          <div class="wrapper">
            {kanjisElements}
          </div>
        </div>
      )
    } else {
      return (
        <div class='section' id='learnedKanjis'>
          <h2>Learned Kanjis</h2>
          <Loading />
        </div>
      )
    }

  }
}

export default LearnedKanjis;