import React, { Component } from 'react';
import Loading from './Loading';
import '../styles/LearnedKanjis.css';
import { getKanjis } from '../actions/actions'
import { connect } from 'react-redux';

class LearnedKanjis extends Component {

  constructor() {
    super();
    this.state = {
      allKanjis: [],
      learnedKanjis: []
    }
  }

  componentDidMount(){
    this.props.getKanjis();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.allKanjis && nextProps.learnedKanjis){
      this.setState({
        allKanjis: nextProps.allKanjis,
        learnedKanjis: nextProps.learnedKanjis
      })
    }
  }

  render() {
    var kanjisElements = [];
    if (this.state.learnedKanjis != undefined & this.state.learnedKanjis.length > 0) {
      for (var i = 0; i < this.state.learnedKanjis.length; i++) {
        var id = this.state.learnedKanjis[i].data.subject_id;
        var srsStatus = this.state.learnedKanjis[i].data.srs_stage_name;
        var characterData = this.state.allKanjis.find(kanjiData => kanjiData.id == id);
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
        <div className='section' id='learnedKanjis'>
          <h2>Learned Kanjis</h2>
          <div className="wrapper">
            {kanjisElements}
          </div>
        </div>
      )
    } else {
      return (
        <div className='section' id='learnedKanjis'>
          <h2>Learned Kanjis</h2>
          <Loading />
        </div>
      )
    }

  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    allKanjis: state.kanjis.allKanjis,
    learnedKanjis: state.kanjis.learnedKanjis
  }
};

function mapDispatchToProps(dispatch) {
  return {
    getKanjis(){
      dispatch(getKanjis())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnedKanjis);