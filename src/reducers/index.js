import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Vehicle from './Vehicle';
import Tires from './Tires';
import RecallFeeds from './RecallFeeds';

const reducers = combineReducers({
  routing: routerReducer,
  vehicle: Vehicle,
  tires: Tires,
  recallfeeds: RecallFeeds,
});

export default reducers;
