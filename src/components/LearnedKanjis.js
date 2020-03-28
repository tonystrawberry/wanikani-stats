import React, { Component } from 'react';
import '../styles/LearnedKanjis.css';
import { getKanjis } from '../actions/actions'
import { connect } from 'react-redux';
import LearnedKanjisSection from './LearnedKanjisSection';
import Loading from './Loading';

class LearnedKanjis extends Component {

  constructor() {
    super();
    this.state = {
      allKanjis: [],
      learnedKanjis: {}
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
    var kanjisSections = [];
    if (this.state.learnedKanjis != undefined & Object.keys(this.state.learnedKanjis).length > 0) {
      for (var status in this.state.learnedKanjis){
        var kanjisElements = [];
        var srsClass = "";
        switch (status) {
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
  
        for (var i = 0; i < this.state.learnedKanjis[status].length; i++) {
          var id = this.state.learnedKanjis[status][i].data.subject_id;
          var characterData = this.state.allKanjis.find(kanjiData => kanjiData.id == id);
          if (characterData != undefined) {
            var character = characterData.data.characters;
            kanjisElements.push(<div class="item"><span class={srsClass}>{character}</span></div>);
          }
        }
        kanjisSections.push(
          <LearnedKanjisSection srsClass={srsClass} status={status} kanjisElements={kanjisElements} />
        );
      }

      return (
        <div className='section' id='learnedKanjis'>
          <h2>Learned Kanjis</h2>
          {kanjisSections}
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