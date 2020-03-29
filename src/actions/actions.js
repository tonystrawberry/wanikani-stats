import axios from 'axios'
import * as devEnvironment from '../env-variables/development'
import * as prodEnvironment from '../env-variables/production'

// levelProgresssions
export const GET_LEVEL_PROGRESSIONS_REQUEST = 'GET_LEVEL_PROGRESSIONS_REQUEST'
export const GET_LEVEL_PROGRESSIONS_SUCCESS = 'GET_LEVEL_PROGRESSIONS_SUCCESS'
export const GET_LEVEL_PROGRESSIONS_FAILURE = 'GET_LEVEL_PROGRESSIONS_FAILURE'

var environmentVariables = {}

switch(process.env.NODE_ENV) {
  case 'development': {
    environmentVariables = devEnvironment
    break
  }
  case 'production': {
    environmentVariables = prodEnvironment
    break
  }
}


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
      const res = await axios.get(environmentVariables.SERVER_ENDPOINT + "level_progressions", {
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
      var learnedKanjis = [];

      var res = await axios.get(environmentVariables.SERVER_ENDPOINT + "kanjis", {
        headers: {
          'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
        }
      });
      allKanjis = res.data;

      res = await axios.get(environmentVariables.SERVER_ENDPOINT + "learned_kanjis", {
        headers: {
          'Authorization': 'Bearer 2d2cee0a-1417-48ee-acac-11a70a638e17'
        }
      });

      learnedKanjis = res.data;      

      return dispatch(getKanjisSuccess({allKanjis: allKanjis, learnedKanjis: learnedKanjis}));
    }
    catch (err) {
      return dispatch(getKanjisFailure(err));
    }
  }
}