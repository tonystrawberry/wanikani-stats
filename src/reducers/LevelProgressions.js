import {
  GET_LEVEL_PROGRESSIONS_REQUEST, GET_LEVEL_PROGRESSIONS_SUCCESS, GET_LEVEL_PROGRESSIONS_FAILURE
} from '../actions/actions';

const initialState = {
  isFetchingLevelProgressions: false,
  data: []
};

const getLevelProgressions = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEVEL_PROGRESSIONS_REQUEST:
      return Object.assign({}, state, {
        isFetchingLevelProgressions: true,
        data: []
      });
    case GET_LEVEL_PROGRESSIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingLevelProgressions: false,
        data: action.data.data,
      });
    case GET_LEVEL_PROGRESSIONS_FAILURE:
      return Object.assign({}, state, {
        isFetchingLevelProgressions: false,
        error: action.error
      });
    default:
      return state
  }
}

export default getLevelProgressions