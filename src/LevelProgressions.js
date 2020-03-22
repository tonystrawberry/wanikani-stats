import React, { Component } from 'react';
import BarGraph from './BarGraph';
import Loading from './Loading';

class LevelProgressions extends Component {

  constructor() {
    super()
  }

  render(){
    if (this.props.levelProgressions != null & this.props.levelProgressions.length > 0){
      var data = [];
      var labels = [];
      var backgroundColors = [];
      var borderColors = []
      var axisLabels = { x: 'レベル', y: '学習時間' }

      for (var i = 0; i < this.props.levelProgressions.length; i++){
        var currentlevelProgression = this.props.levelProgressions[i];
        var datePassedAt = new Date(currentlevelProgression.data.passed_at);
        var dateStartedAt = new Date(currentlevelProgression.data.started_at);
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
        <div class='section' id='levelProgressions'>
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
        <div class='section' id='levelProgressions'>
          <h2>Level Duration</h2>
          <Loading />
        </div>
      )
    }
    
  }
}

export default LevelProgressions;