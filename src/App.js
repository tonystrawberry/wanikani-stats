import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LevelProgressions from './components/LevelProgressions';
import LearnedKanjis from './LearnedKanjis';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      allKanjis: [],
      learnedKanjis: [],
      levelProgressions: []
    }
  }

  // async getData() {

  //   var res = null;
  //   var data = null;
  //   var iteration = 0;

  //   // Get levelProgressions
  //   var levelProgressions = [];
  //   res = await axios.get("https://api.wanikani.com/v2/level_progressions", {
  //     headers: {
  //       'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
  //     }
  //   });

  //   data = res.data;
  //   console.log(data);
  //   levelProgressions = levelProgressions.concat(res.data.data);

  //   // Get allKanjis
  //   var allKanjis = [];
  //   res = await axios.get("https://api.wanikani.com/v2/subjects?types=kanji", {
  //     headers: {
  //       'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
  //     }
  //   });

  //   data = res.data;
  //   iteration = 0;
  //   console.log("res", res)
  //   do {
  //     allKanjis = allKanjis.concat(res.data.data);
  //     if (res.data.pages.next_url){
  //       res = await axios.get(res.data.pages.next_url, {
  //         headers: {
  //           'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
  //         }
  //       });

  //       // Prevent infinite loops
  //       iteration++;
  //       if (iteration == 10){
  //         break;
  //       }
  //     }
  //   } while (res.data.pages.next_url != null)

  //   // Get learnedKanjis
  //   var learnedKanjis = [];
  //   res = await axios.get("https://api.wanikani.com/v2/assignments?subject_types=kanji", {
  //     headers: {
  //       'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
  //     }
  //   });

  //   data = res.data;
  //   iteration = 0;
  //   do {
  //     learnedKanjis = learnedKanjis.concat(res.data.data);
  //     if (res.data.pages.next_url){
  //       res = await axios.get(res.data.pages.next_url, {
  //         headers: {
  //           'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
  //         }
  //       });

  //       // Prevent infinite loops
  //       iteration++;
  //       if (iteration == 10){
  //         break;
  //       }
  //     }
  //   } while (res.data.pages.next_url != null)
  //   this.setState({levelProgressions: levelProgressions, allKanjis: allKanjis, learnedKanjis: learnedKanjis});
  // }
  
  // componentDidMount() {
  //   this.getData();
  // }

  render(){
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <LevelProgressions levelProgressions={this.state.levelProgressions} />
      </React.Fragment>
    )
  }
}

export default App;
