import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET, POST } from '../util/request';
import { config } from '../config';
import {
  GET_VEHICLE_FEED,
  GET_TIRE_FEED,
  GET_CHILD_FEED,
  GET_RECALL_SEARCH,
  GET_SAFETY_SEARCH,
  GET_SAFETY_DETAILS,
  GET_COMPLAINT_SEARCH,
  GET_VIN_DECODE,
} from '../constants/ActionTypes';
import {
  getVehicleFeedSuccess,
  getVehicleFeedFailed,
  getTireFeedSuccess,
  getTireFeedFailed,
  getChildFeedSuccess,
  getChildFeedFailed,
  getRecallSearchSuccess,
  getRecallSearchFailed,
  getSafetySearchSuccess,
  getSafetySearchFailed,
  getSafetyDetailsSuccess,
  getSafetyDetailsFailed,
  getComplaintSearchSuccess,
  getComplaintSearchFailed,
  getVinDecodeSuccess,
  getVinDecodeFailed,
} from '../actions/RecallFeeds';

const getVehicleFeedCall = async () =>
  await GET(`rss_recalls_V.xml`, {
    baseUrl: `${config.feedsUrl}`,
    headers: {
      'Content-Type': 'application/xml',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getTireFeedCall = async () =>
  await GET(`rss_recalls_T.xml`, {
    baseUrl: `${config.feedsUrl}`,
    headers: {
      'Content-Type': 'application/xml',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getChildFeedCall = async () =>
  await GET(`rss_recalls_C.xml`, {
    baseUrl: `${config.feedsUrl}`,
    headers: {
      'Content-Type': 'application/xml',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getRecallSearchCall = async (year, make, model) =>
  await GET(
    `Recalls/vehicle/modelyear/${year}/make/${make}/model/${model}?format=json`,
    {
      baseUrl: `${config.nhtsaUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const getSafetySearchCall = async (year, make, model) =>
  await GET(
    `SafetyRatings/modelyear/${year}/make/${make}/model/${model}?format=json`,
    {
      baseUrl: `${config.nhtsaUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const getSafetyDetailsCall = async VehicleId =>
  await GET(`SafetyRatings/VehicleId/${VehicleId}?format=json`, {
    baseUrl: `${config.nhtsaUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getComplaintSearchCall = async (year, make, model) =>
  await GET(
    `Complaints/vehicle/modelyear/${year}/make/${make}/model/${model}?format=json`,
    {
      baseUrl: `${config.nhtsaUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const getVinDecodeCall = async vin =>
  await GET(`vehicles/DecodeVinValuesExtended/${vin}?format=json`, {
    baseUrl: `${config.vpicUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

function* getVehicleFeedRequest() {
  try {
    const vehicle_feed = yield call(getVehicleFeedCall);
    if (vehicle_feed.status >= 200 && vehicle_feed.status < 400) {
      yield put(getVehicleFeedSuccess(vehicle_feed.data));
    } else {
      yield put(getVehicleFeedFailed(vehicle_feed.data));
    }
  } catch (error) {
    yield put(getVehicleFeedFailed(error));
  }
}

function* getTireFeedRequest() {
  try {
    const tire_feed = yield call(getTireFeedCall);
    if (tire_feed.status >= 200 && tire_feed.status < 400) {
      yield put(getTireFeedSuccess(tire_feed.data));
    } else {
      yield put(getTireFeedFailed(tire_feed.data));
    }
  } catch (error) {
    yield put(getTireFeedFailed(error));
  }
}

function* getChildFeedRequest() {
  try {
    const child_feed = yield call(getChildFeedCall);
    if (child_feed.status >= 200 && child_feed.status < 400) {
      yield put(getChildFeedSuccess(child_feed.data));
    } else {
      yield put(getChildFeedFailed(child_feed.data));
    }
  } catch (error) {
    yield put(getChildFeedFailed(error));
  }
}

function* getRecallSearchRequest({ params }) {
  const { year, make, model } = params;
  try {
    const recall_results = yield call(getRecallSearchCall, year, make, model);
    if (recall_results.status >= 200 && recall_results.status < 400) {
      yield put(getRecallSearchSuccess(recall_results.data));
    } else {
      yield put(getRecallSearchFailed(recall_results.data));
    }
  } catch (error) {
    yield put(getRecallSearchFailed(error));
  }
}

function* getSafetySearchRequest({ params }) {
  const { year, make, model } = params;
  try {
    const safety_results = yield call(getSafetySearchCall, year, make, model);
    if (safety_results.status >= 200 && safety_results.status < 400) {
      yield put(getSafetySearchSuccess(safety_results.data));
    } else {
      yield put(getSafetySearchFailed(safety_results.data));
    }
  } catch (error) {
    yield put(getSafetySearchFailed(error));
  }
}

function* getSafetyDetailsRequest({ VehicleId }) {
  try {
    const safety_details = yield call(getSafetyDetailsCall, VehicleId);
    if (safety_details.status >= 200 && safety_details.status < 400) {
      yield put(getSafetyDetailsSuccess(safety_details.data));
    } else {
      yield put(getSafetyDetailsFailed(safety_details.data));
    }
  } catch (error) {
    yield put(getSafetyDetailsFailed(error));
  }
}

function* getComplaintSearchRequest({ params }) {
  const { year, make, model } = params;
  try {
    const complaint_results = yield call(
      getComplaintSearchCall,
      year,
      make,
      model,
    );
    if (complaint_results.status >= 200 && complaint_results.status < 400) {
      yield put(getComplaintSearchSuccess(complaint_results.data));
    } else {
      yield put(getComplaintSearchFailed(complaint_results.data));
    }
  } catch (error) {
    yield put(getComplaintSearchFailed(error));
  }
}

function* getVinDecodeRequest({ vin }) {
  try {
    const vin_decode = yield call(getVinDecodeCall, vin);
    if (vin_decode.status >= 200 && vin_decode.status < 400) {
      yield put(getVinDecodeSuccess(vin_decode.data));
    } else {
      yield put(getVinDecodeFailed(vin_decode.data));
    }
  } catch (error) {
    yield put(getVinDecodeFailed(error));
  }
}

export function* getVehicleFeed() {
  yield takeEvery(GET_VEHICLE_FEED, getVehicleFeedRequest);
}

export function* getTireFeed() {
  yield takeEvery(GET_TIRE_FEED, getTireFeedRequest);
}

export function* getChildFeed() {
  yield takeEvery(GET_CHILD_FEED, getChildFeedRequest);
}

export function* getRecallSearch() {
  yield takeEvery(GET_RECALL_SEARCH, getRecallSearchRequest);
}

export function* getSafetySearch() {
  yield takeEvery(GET_SAFETY_SEARCH, getSafetySearchRequest);
}

export function* getSafetyDetails() {
  yield takeEvery(GET_SAFETY_DETAILS, getSafetyDetailsRequest);
}

export function* getComplaintSearch() {
  yield takeEvery(GET_COMPLAINT_SEARCH, getComplaintSearchRequest);
}

export function* getVinDecode() {
  yield takeEvery(GET_VIN_DECODE, getVinDecodeRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getVehicleFeed),
    fork(getTireFeed),
    fork(getChildFeed),
    fork(getRecallSearch),
    fork(getSafetySearch),
    fork(getSafetyDetails),
    fork(getComplaintSearch),
    fork(getVinDecode),
  ]);
}
