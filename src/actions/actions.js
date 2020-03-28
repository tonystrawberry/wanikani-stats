import axios from 'axios'

// levelProgresssions
export const GET_LEVEL_PROGRESSIONS_REQUEST = 'GET_LEVEL_PROGRESSIONS_REQUEST'
export const GET_LEVEL_PROGRESSIONS_SUCCESS = 'GET_LEVEL_PROGRESSIONS_SUCCESS'
export const GET_LEVEL_PROGRESSIONS_FAILURE = 'GET_LEVEL_PROGRESSIONS_FAILURE'

export const getLevelProgressionsRequest = () => {
  return {
    type: GET_LEVEL_PROGRESSIONS_REQUEST
  }
}

export const getLevelProgressionsSuccess = (data) => {
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

// kanjis
export const GET_KANJIS_REQUEST = 'GET_KANJIS_REQUEST'
export const GET_KANJIS_SUCCESS = 'GET_KANJIS_SUCCESS'
export const GET_KANJIS_FAILURE = 'GET_KANJIS_FAILURE'

export const getKanjisRequest = () => {
  return {
    type: GET_KANJIS_REQUEST
  }
}

export const getKanjisSuccess = (data) => {
  return {
    type: GET_KANJIS_SUCCESS,
    data
  }
}

export const getKanjisFailure = (error) => {
  return {
    type: GET_KANJIS_FAILURE,
    error
  }
}

export const getKanjis = () => {
  return async (dispatch) => {
    dispatch(getKanjisRequest())
    try {
      var allKanjis = [];
      var iteration = 0;

      var res = await axios.get("https://api.wanikani.com/v2/subjects?types=kanji", {
        headers: {
          'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
        }
      });
      allKanjis.concat(res.data.data);
      do {
        allKanjis = allKanjis.concat(res.data.data);
        if (res.data.pages.next_url){
          res = await axios.get(res.data.pages.next_url, {
            headers: {
              'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
            }
          });
  
          // Prevent infinite loops
          iteration++;
          if (iteration == 10){
            break;
          }
        }
      } while (res.data.pages.next_url != null);

      // Get learnedKanjis
      var learnedKanjis = [];
      iteration = 0;

      res = await axios.get("https://api.wanikani.com/v2/assignments?subject_types=kanji", {
        headers: {
          'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
        }
      });

      do {
        learnedKanjis = learnedKanjis.concat(res.data.data);
        if (res.data.pages.next_url){
          res = await axios.get(res.data.pages.next_url, {
            headers: {
              'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
            }
          });

          // Prevent infinite loops
          iteration++;
          if (iteration == 10){
            break;
          }
        }
      } while (res.data.pages.next_url != null)
      console.log("Dispatching...")
      return dispatch(getKanjisSuccess({allKanjis: allKanjis, learnedKanjis: learnedKanjis}));
    }
    catch (err) {
      return dispatch(getKanjisFailure(err));
    }
  }
}