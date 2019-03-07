import { all } from 'redux-saga/effects';
import vehicleSagas from './Vehicle';
import tiresSagas from './Tires';
import recallfeedsSagas from './RecallFeeds';

export default function* rootSaga(getState) {
  yield all([vehicleSagas(), tiresSagas(), recallfeedsSagas()]);
}
