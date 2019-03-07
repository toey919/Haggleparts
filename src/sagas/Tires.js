import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET, POST } from '../util/request';
import { config } from '../config';
import {
  GET_TIRE_WIDTHS,
  POST_TIRE_ASPECT,
  POST_TIRE_DIAMETERS,
  POST_TIRE_SEARCH,
} from '../constants/ActionTypes';
import {
  getTireWidthsSuccess,
  getTireWidthsFailed,
  postTireAspectSuccess,
  postTireAspectFailed,
  postTireDiametersSuccess,
  postTireDiametersFailed,
  postTireSearchSuccess,
  postTireSearchFailed,
} from '../actions/Tires';

const getTireWidthsCall = async () =>
  await GET(`?action=tire_widths`, {
    baseUrl: `${config.adminUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const postTireAspectCall = async data =>
  await POST(`?action=tire_aspects`, {
    baseUrl: `${config.adminUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const postTireDiametersCall = async data =>
  await POST(`?action=tire_diameters`, {
    baseUrl: `${config.adminUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

const postTireSearchCall = async data =>
  await POST(`?action=tire_search`, {
    baseUrl: `${config.adminUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
    .then(response => response)
    .catch(error => error.response);

function* getTireWidthsRequest() {
  try {
    const tire_widths = yield call(getTireWidthsCall);
    if (tire_widths.status >= 200 && tire_widths.status < 400) {
      yield put(getTireWidthsSuccess(tire_widths.data));
    } else {
      yield put(getTireWidthsFailed(tire_widths.data));
    }
  } catch (error) {
    yield put(getTireWidthsFailed(error));
  }
}

function* postTireAspectRequest({ data }) {
  try {
    const tire_aspect = yield call(postTireAspectCall, data);
    if (tire_aspect.status >= 200 && tire_aspect.status < 400) {
      yield put(postTireAspectSuccess(tire_aspect.data));
    } else {
      yield put(postTireAspectFailed(tire_aspect.data));
    }
  } catch (error) {
    yield put(postTireAspectFailed(error));
  }
}

function* postTireDiametersRequest({ data }) {
  try {
    const tire_diameters = yield call(postTireDiametersCall, data);
    if (tire_diameters.status >= 200 && tire_diameters.status < 400) {
      yield put(postTireDiametersSuccess(tire_diameters.data));
    } else {
      yield put(postTireDiametersFailed(tire_diameters.data));
    }
  } catch (error) {
    yield put(postTireDiametersFailed(error));
  }
}

function* postTireSearchRequest({ data }) {
  try {
    const tire_search = yield call(postTireSearchCall, data);
    console.log('tire search: ', tire_search);
    if (tire_search.status >= 200 && tire_search.status < 400) {
      yield put(postTireSearchSuccess(tire_search.data));
    } else {
      yield put(postTireSearchFailed(tire_search.data));
    }
  } catch (error) {
    yield put(postTireSearchFailed(error));
  }
}

export function* getTireWidths() {
  yield takeEvery(GET_TIRE_WIDTHS, getTireWidthsRequest);
}

export function* postTireAspect() {
  yield takeEvery(POST_TIRE_ASPECT, postTireAspectRequest);
}

export function* postTireDiameters() {
  yield takeEvery(POST_TIRE_DIAMETERS, postTireDiametersRequest);
}

export function* postTireSearch() {
  yield takeEvery(POST_TIRE_SEARCH, postTireSearchRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getTireWidths),
    fork(postTireAspect),
    fork(postTireDiameters),
    fork(postTireSearch),
  ]);
}
