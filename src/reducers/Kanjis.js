import {
  GET_KANJIS_FAILURE, GET_KANJIS_SUCCESS, GET_KANJIS_REQUEST
} from '../actions/actions';

const statusesOrder = {
  "Burned": 0,
  "Enlightened": 1,
  "Master": 2,
  "Guru II": 3,
  "Guru I": 4,
  "Apprentice IV": 5,
  "Apprentice III": 6,
  "Apprentice II": 7,
  "Apprentice I": 8,
  "Initiate": 9
}

const initialState = {
  isFetchingKanjis: false,
  allKanjis: [],
  learnedKanjis: []
};

function sortKeys(learnedKanjisByStatus){
  var keys = Object.keys(learnedKanjisByStatus) 
  .sort(function order(status1, status2) { 
      if (statusesOrder[status1] < statusesOrder[status2]) return -1; 
      else if (statusesOrder[status1] > statusesOrder[status2]) return 1; 
      else return 0; 
  });  
    
  // Taking the object in 'temp' object 
  // and deleting the original object. 
  var temp = {}; 
    
  for (var i = 0; i < keys.length; i++) { 
      temp[keys[i]] = learnedKanjisByStatus[keys[i]]; 
      delete learnedKanjisByStatus[keys[i]]; 
  }  

  // Copying the object from 'temp' to  
  // 'original object'. 
  for (var i = 0; i < keys.length; i++) { 
      learnedKanjisByStatus[keys[i]] = temp[keys[i]]; 
  }  
  return learnedKanjisByStatus; 
}

const getKanjis = (state = initialState, action) => {
  switch (action.type) {
    case GET_KANJIS_REQUEST:
      return Object.assign({}, state, {
        isFetchingKanjis: true,
        allKanjis: [],
        learnedKanjis: []
      });
    case GET_KANJIS_SUCCESS:

      var learnedKanjisByStatus = {};
      for (var i = 0; i < action.data.learnedKanjis.length; i++){
        var srsStatus = action.data.learnedKanjis[i].data.srs_stage_name;
        learnedKanjisByStatus[srsStatus] = learnedKanjisByStatus[srsStatus] || [];
        learnedKanjisByStatus[srsStatus].push(action.data.learnedKanjis[i]);
      }

      learnedKanjisByStatus = sortKeys(learnedKanjisByStatus);

      return Object.assign({}, state, {
        isFetchingKanjis: false,
        allKanjis: action.data.allKanjis,
        learnedKanjis: learnedKanjisByStatus
      });
    case GET_KANJIS_FAILURE:
      return Object.assign({}, state, {
        isFetchingKanjis: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default getKanjis