import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../styles/LearnedProgressions.scss';
import BarGraph from './BarGraph';
import Loading from './Loading';
import { getLevelProgressions } from '../actions/actions'


class LevelProgressions extends Component {

  constructor() {
    super();
    this.state = {
      levelProgressions: []
    };
  }

  componentDidMount(){
    this.props.getLevelProgressions();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.levelProgressions){
      this.setState({
        levelProgressions: nextProps.levelProgressions
      })
    }
  }

  render(){
    if (this.state.levelProgressions != undefined & this.state.levelProgressions.length > 0){
      var data = [];
      var labels = [];
      var backgroundColors = [];
      var borderColors = []
      var axisLabels = { x: 'レベル', y: '学習時間' }

      for (var i = 0; i < this.state.levelProgressions.length; i++){
        var currentlevelProgression = this.state.levelProgressions[i];

        var datePassedAt = null;
        if (currentlevelProgression.data.passed_at == null){
          datePassedAt = new Date();
        } else {
          datePassedAt = new Date(currentlevelProgression.data.passed_at);
        }

        var dateStartedAt = new Date(currentlevelProgression.data.started_at);
        
        if (datePassedAt == "Invalid Date"){
          datePassedAt = new Date();
        }

        var numberOfDays = (datePassedAt.getTime() - dateStartedAt.getTime()) / (1000*60*60*24);
        if (numberOfDays < 15){
          backgroundColors.push('rgba(7, 217, 0, 0.3)')
          borderColors.push('rgba(7, 217, 0, 1)')
        } else if (numberOfDays < 25){
          backgroundColors.push('rgba(247, 234, 47, 0.3)')
          borderColors.push('rgba(247, 234, 47, 1)')
        } else {
          backgroundColors.push('rgba(255, 74, 46, 0.3)')
          borderColors.push('rgba(255, 74, 46, 1)')
        }
        data.push(parseInt(numberOfDays));
        labels.push(currentlevelProgression.data.level);
      }

      return (
        <div className='section' id='levelProgressions'>
          <h2>Level Duration</h2>
          <BarGraph
            label={"日数"}
            data={data}
            labels={labels}
            backgroundColors={backgroundColors}
            borderColors={borderColors}
            axisLabels={axisLabels}
          />
        </div>
      )
    } else {
      return(
        <div className='section' id='levelProgressions'>
          <h2>Level Duration</h2>
          <Loading />
        </div>
      )
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    levelProgressions: state.levelProgressions.data
  }
};

function mapDispatchToProps(dispatch) {
  return {
    getLevelProgressions(){
      dispatch(getLevelProgressions())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelProgressions);