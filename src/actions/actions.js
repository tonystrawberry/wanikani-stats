import axios from 'axios'
export const GET_LEVEL_PROGRESSIONS_REQUEST = 'GET_LEVEL_PROGRESSIONS_REQUEST'
export const GET_LEVEL_PROGRESSIONS_SUCCESS = 'GET_LEVEL_PROGRESSIONS_SUCCESS'
export const GET_LEVEL_PROGRESSIONS_FAILURE = 'GET_LEVEL_PROGRESSIONS_FAILURE'

export const getLevelProgressionsRequest = () => {
  return {
    type: GET_LEVEL_PROGRESSIONS_REQUEST
  }
}

export const getLevelProgressionsSuccess = (data) => {
  console.log(data);
  return {
    type: GET_LEVEL_PROGRESSIONS_SUCCESS,
    data
  }
}

export const getLevelProgressionsFailure = (error) => {
  return {
    type: GET_LEVEL_PROGRESSIONS_FAILURE,
    error
  }
}

export const getLevelProgressions = () => {
  console.log("getLevelProgressions ICI")
  return async (dispatch) => {
    dispatch(getLevelProgressionsRequest())
    try {
      const res = await axios.get("https://api.wanikani.com/v2/level_progressions", {
            headers: {
              'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
            }
          });
      return dispatch(getLevelProgressionsSuccess(res.data));
    }
    catch (err) {
      return dispatch(getLevelProgressionsFailure(err));
    }
  }
}