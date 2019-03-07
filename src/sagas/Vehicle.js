import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET, POST } from '../util/request';
import { config } from '../config';
import {
  GET_VEHICLE_YEARS,
  GET_VEHICLE_MAKES,
  GET_VEHICLE_MODELS,
  GET_VEHICLE_CATEGORIES,
  GET_VEHICLE_PART_TYPES,
  GET_VEHICLE_ENGINES,
  GET_PART_SEARCH,
  GET_PART_LISTINGS,
  GET_PART_TEXT_SEARCH,
} from '../constants/ActionTypes';
import {
  getVehicleYearsSuccess,
  getVehicleYearsFailed,
  getVehicleMakesSuccess,
  getVehicleMakesFailed,
  getVehicleModelsSuccess,
  getVehicleModelsFailed,
  getVehicleCategoriesSuccess,
  getVehicleCategoriesFailed,
  getVehiclePartTypesSuccess,
  getVehiclePartTypesFailed,
  getVehicleEnginesSuccess,
  getVehicleEnginesFailed,
  getPartSearchSuccess,
  getPartSearchFailed,
  getPartListingsSuccess,
  getPartListingsFailed,
  getPartTextSearchSuccess,
  getPartTextSearchFailed,
} from '../actions/Vehicle';

const getVehicleYearsCall = async () =>
  await GET(`vehicle_info/years`, {
    baseUrl: `${config.mycarbayUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getVehicleMakesCall = async params =>
  await GET(`vehicle_info/years/${params}/makes`, {
    baseUrl: `${config.mycarbayUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getVehicleModelsCall = async (year, make) =>
  await GET(`vehicle_info/years/${year}/makes/${make}/models`, {
    baseUrl: `${config.mycarbayUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

const getVehicleCategoriesCall = async (year, make, model) =>
  await GET(
    `vehicle_info/years/${year}/makes/${make}/models/${model}/categories`,
    {
      baseUrl: `${config.mycarbayUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const getVehiclePartTypesCall = async (year, make, model, category) =>
  await GET(
    `?action=part_types_json&year=${year}&make=${make}&model=${model}&category=${category}`,
    {
      baseUrl: `${config.adminUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const getVehicleEnginesCall = async (year, make, model, category) =>
  await GET(
    `vehicle_info/years/${year}/makes/${make}/models/${model}/categories/${category}/engines`,
    {
      baseUrl: `${config.mycarbayUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const getPartSearchCall = async (year, make, model, category, engine) =>
  await GET(
    `?action=parts${year ? `&year=${year}` : ''}${make ? `&make=${make}` : ''}${
      model ? `&model=${model}` : ''
    }${engine ? `&engine=${engine}` : ''}${
      category ? `&category=${category}` : ''
    }`,
    {
      baseUrl: `${config.adminUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const getPartListingsCall = async (manufacturer, part_no) =>
  await GET(
    `?action=part_results&part_no=${part_no}&manufacturer=${manufacturer}`,
    {
      baseUrl: `${config.adminUrl}`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response)
    .catch(error => error.response);

const getPartTextSearchCall = async query =>
  await GET(`?action=part_text_search&query=${query}`, {
    baseUrl: `${config.adminUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => error.response);

function* getVehicleYearsRequest() {
  try {
    const years = yield call(getVehicleYearsCall);
    if (years.status >= 200 && years.status < 400) {
      yield put(getVehicleYearsSuccess(years.data));
    } else {
      yield put(getVehicleYearsFailed(years.data));
    }
  } catch (error) {
    yield put(getVehicleYearsFailed(error));
  }
}

function* getVehicleMakesRequest({ params }) {
  try {
    const makes = yield call(getVehicleMakesCall, params);
    if (makes.status >= 200 && makes.status < 400) {
      yield put(getVehicleMakesSuccess(makes.data));
    } else {
      yield put(getVehicleMakesFailed(makes.data));
    }
  } catch (error) {
    yield put(getVehicleMakesFailed(error));
  }
}

function* getVehicleModelsRequest({ params }) {
  const { year, make } = params;
  try {
    const models = yield call(getVehicleModelsCall, year, make);
    if (models.status >= 200 && models.status < 400) {
      yield put(getVehicleModelsSuccess(models.data));
    } else {
      yield put(getVehicleModelsFailed(models.data));
    }
  } catch (error) {
    yield put(getVehicleModelsFailed(error));
  }
}

function* getVehicleCategoriesRequest({ params }) {
  const { year, make, model } = params;
  try {
    const categories = yield call(getVehicleCategoriesCall, year, make, model);
    if (categories.status >= 200 && categories.status < 400) {
      yield put(getVehicleCategoriesSuccess(categories.data));
    } else {
      yield put(getVehicleCategoriesFailed(categories.data));
    }
  } catch (error) {
    yield put(getVehicleCategoriesFailed(error));
  }
}

function* getVehiclePartTypesRequest({ params }) {
  const { year, make, model, category } = params;
  try {
    const part_types = yield call(
      getVehiclePartTypesCall,
      year,
      make,
      model,
      category,
    );
    if (part_types.status >= 200 && part_types.status < 400) {
      yield put(getVehiclePartTypesSuccess(part_types.data));
    } else {
      yield put(getVehiclePartTypesFailed(part_types.data));
    }
  } catch (error) {
    yield put(getVehiclePartTypesFailed(error));
  }
}

function* getVehicleEnginesRequest({ params }) {
  const { year, make, model, category } = params;
  try {
    const engines = yield call(
      getVehicleEnginesCall,
      year,
      make,
      model,
      category,
    );
    if (engines.status >= 200 && engines.status < 400) {
      yield put(getVehicleEnginesSuccess(engines.data));
    } else {
      yield put(getVehicleEnginesFailed(engines.data));
    }
  } catch (error) {
    yield put(getVehicleEnginesFailed(error));
  }
}

function* getPartSearchRequest({ params }) {
  const { year, make, model, category, engine } = params;
  try {
    const search_results = yield call(
      getPartSearchCall,
      year,
      make,
      model,
      category,
      engine,
    );
    console.log('part search: ', search_results);
    if (search_results.status >= 200 && search_results.status < 400) {
      yield put(getPartSearchSuccess(search_results.data));
    } else {
      yield put(getPartSearchFailed(search_results.data));
    }
  } catch (error) {
    yield put(getPartSearchFailed(error));
  }
}

function* getPartListingsRequest({ params }) {
  const { manufacturer, part_no } = params;
  try {
    const part_listings = yield call(
      getPartListingsCall,
      manufacturer,
      part_no,
    );
    if (part_listings.status >= 200 && part_listings.status < 400) {
      yield put(getPartListingsSuccess(part_listings.data));
    } else {
      yield put(getPartListingsFailed(part_listings.data));
    }
  } catch (error) {
    yield put(getPartListingsFailed(error));
  }
}

function* getPartTextSearchRequest({ params }) {
  try {
    const part_listings = yield call(getPartTextSearchCall, params);
    if (part_listings.status >= 200 && part_listings.status < 400) {
      yield put(getPartTextSearchSuccess(part_listings.data));
    } else {
      yield put(getPartTextSearchFailed(part_listings.data));
    }
  } catch (error) {
    yield put(getPartTextSearchFailed(error));
  }
}

export function* getVehicleYears() {
  yield takeEvery(GET_VEHICLE_YEARS, getVehicleYearsRequest);
}

export function* getVehicleMakes() {
  yield takeEvery(GET_VEHICLE_MAKES, getVehicleMakesRequest);
}

export function* getVehicleModels() {
  yield takeEvery(GET_VEHICLE_MODELS, getVehicleModelsRequest);
}

export function* getVehicleCategories() {
  yield takeEvery(GET_VEHICLE_CATEGORIES, getVehicleCategoriesRequest);
}

export function* getVehiclePartTypes() {
  yield takeEvery(GET_VEHICLE_PART_TYPES, getVehiclePartTypesRequest);
}

export function* getVehicleEngines() {
  yield takeEvery(GET_VEHICLE_ENGINES, getVehicleEnginesRequest);
}

export function* getPartSearch() {
  yield takeEvery(GET_PART_SEARCH, getPartSearchRequest);
}

export function* getPartListings() {
  yield takeEvery(GET_PART_LISTINGS, getPartListingsRequest);
}

export function* getPartTextSearch() {
  yield takeEvery(GET_PART_TEXT_SEARCH, getPartTextSearchRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getVehicleYears),
    fork(getVehicleMakes),
    fork(getVehicleModels),
    fork(getVehicleCategories),
    fork(getVehiclePartTypes),
    fork(getVehicleEngines),
    fork(getPartSearch),
    fork(getPartListings),
    fork(getPartTextSearch),
  ]);
}
