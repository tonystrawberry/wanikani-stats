import React, { Component } from 'react';
import '../styles/LearnedKanjis.scss';

class KanjiDetailsBox extends Component {

  constructor() {
    super();
  }

  render() {
    var onyomi = this.props.readings.find((reading) => reading.type == 'onyomi');
    var kunyomi = this.props.readings.find((reading) => reading.type == 'kunyomi');
    
    var kanjiDetails = [];

    if (onyomi != undefined){
      kanjiDetails.push(<div><span>On'yomi</span><div style={{'display': "inline-block"}}>{onyomi.reading}</div></div>)
    }

    if (kunyomi != undefined){
      kanjiDetails.push(<div><span>Kun'yomi</span><div style={{'display': "inline-block"}}>{kunyomi.reading}</div></div>)
    }

    return (
      <div className={`detailsBox ${this.props.srsClass}`}>
        <div class='kanjiMain'>
          <span class='kanjiBig'>{this.props.kanjiCharacter}</span>
          <div className='kanjiMeaning'>{this.props.meanings[0].meaning}</div>
        </div>
        <div class='kanjiDetails'>
          {kanjiDetails}
        </div>
      </div>
    )
  }
}

export default KanjiDetailsBox;