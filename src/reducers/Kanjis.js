import {
  GET_KANJIS_FAILURE, GET_KANJIS_SUCCESS, GET_KANJIS_REQUEST
} from '../actions/actions';

const initialState = {
  isFetchingKanjis: false,
  allKanjis: [],
  learnedKanjis: []
};

const getKanjis = (state = initialState, action) => {
  switch (action.type) {
    case GET_KANJIS_REQUEST:
      return Object.assign({}, state, {
        isFetchingKanjis: true,
        allKanjis: [],
        learnedKanjis: []
      });
    case GET_KANJIS_SUCCESS:
      console.log("action", action);
      return Object.assign({}, state, {
        isFetchingKanjis: false,
        allKanjis: action.data.allKanjis,
        learnedKanjis: action.data.learnedKanjis
      });
    case GET_KANJIS_FAILURE:
      return Object.assign({}, state, {
        isFetchingKanjis: false,
        error: action.error
      });
    default:
      return state
  }
}

export default getKanjis