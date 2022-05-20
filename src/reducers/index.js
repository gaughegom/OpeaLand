import { combineReducers } from 'redux';
import home from '../features/home/homeSlice'

const rootReducer = combineReducers({
  home
});

export default rootReducer;