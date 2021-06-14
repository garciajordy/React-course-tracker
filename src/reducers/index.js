import { combineReducers } from 'redux';
import LogIn from './LoginReducer';
import CourseReducer from './CourseReducer';
import MeasurementReducer from './MeasurementReducer';

const reducers = combineReducers({
  LogIn,
  CourseReducer,
  MeasurementReducer,

});
export default reducers;
