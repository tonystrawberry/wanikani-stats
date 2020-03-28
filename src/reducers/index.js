import { combineReducers } from 'redux'
import levelProgressions from './LevelProgressions'
import kanjis from './Kanjis'

export default combineReducers({
  levelProgressions,
  kanjis
});