import {
  GET_VEHICLE_YEARS,
  GET_VEHICLE_YEARS_SUCCESS,
  GET_VEHICLE_YEARS_FAILED,
  GET_VEHICLE_MAKES,
  GET_VEHICLE_MAKES_SUCCESS,
  GET_VEHICLE_MAKES_FAILED,
  GET_VEHICLE_MODELS,
  GET_VEHICLE_MODELS_SUCCESS,
  GET_VEHICLE_MODELS_FAILED,
  GET_VEHICLE_CATEGORIES,
  GET_VEHICLE_CATEGORIES_SUCCESS,
  GET_VEHICLE_CATEGORIES_FAILED,
  GET_VEHICLE_PART_TYPES,
  GET_VEHICLE_PART_TYPES_SUCCESS,
  GET_VEHICLE_PART_TYPES_FAILED,
  GET_VEHICLE_ENGINES,
  GET_VEHICLE_ENGINES_SUCCESS,
  GET_VEHICLE_ENGINES_FAILED,
  GET_PART_SEARCH,
  GET_PART_SEARCH_SUCCESS,
  GET_PART_SEARCH_FAILED,
  GET_PART_LISTINGS,
  GET_PART_LISTINGS_SUCCESS,
  GET_PART_LISTINGS_FAILED,
  GET_PART_TEXT_SEARCH,
  GET_PART_TEXT_SEARCH_SUCCESS,
  GET_PART_TEXT_SEARCH_FAILED,
} from '../constants/ActionTypes';

export function getVehicleYears() {
  return { type: GET_VEHICLE_YEARS };
}

export function getVehicleYearsSuccess(years) {
  return { type: GET_VEHICLE_YEARS_SUCCESS, years };
}

export function getVehicleYearsFailed(error) {
  return { type: GET_VEHICLE_YEARS_FAILED, error };
}

export function getVehicleMakes(params) {
  return { type: GET_VEHICLE_MAKES, params };
}

export function getVehicleMakesSuccess(makes) {
  return { type: GET_VEHICLE_MAKES_SUCCESS, makes };
}

export function getVehicleMakesFailed(error) {
  return { type: GET_VEHICLE_MAKES_FAILED, error };
}

export function getVehicleModels(params) {
  return { type: GET_VEHICLE_MODELS, params };
}

export function getVehicleModelsSuccess(models) {
  return { type: GET_VEHICLE_MODELS_SUCCESS, models };
}

export function getVehicleModelsFailed(error) {
  return { type: GET_VEHICLE_MODELS_FAILED, error };
}

export function getVehicleCategories(params) {
  return { type: GET_VEHICLE_CATEGORIES, params };
}

export function getVehicleCategoriesSuccess(categories) {
  return { type: GET_VEHICLE_CATEGORIES_SUCCESS, categories };
}

export function getVehicleCategoriesFailed(error) {
  return { type: GET_VEHICLE_CATEGORIES_FAILED, error };
}

export function getVehiclePartTypes(params) {
  return { type: GET_VEHICLE_PART_TYPES, params };
}

export function getVehiclePartTypesSuccess(part_types) {
  return { type: GET_VEHICLE_PART_TYPES_SUCCESS, part_types };
}

export function getVehiclePartTypesFailed(error) {
  return { type: GET_VEHICLE_PART_TYPES_FAILED, error };
}

export function getVehicleEngines(params) {
  return { type: GET_VEHICLE_ENGINES, params };
}

export function getVehicleEnginesSuccess(engines) {
  return { type: GET_VEHICLE_ENGINES_SUCCESS, engines };
}

export function getVehicleEnginesFailed(error) {
  return { type: GET_VEHICLE_ENGINES_FAILED, error };
}

export function getPartSearch(params) {
  return { type: GET_PART_SEARCH, params };
}

export function getPartSearchSuccess(search_results) {
  return { type: GET_PART_SEARCH_SUCCESS, search_results };
}

export function getPartSearchFailed(error) {
  return { type: GET_PART_SEARCH_FAILED, error };
}

export function getPartListings(params) {
  return { type: GET_PART_LISTINGS, params };
}

export function getPartListingsSuccess(part_listings) {
  return { type: GET_PART_LISTINGS_SUCCESS, part_listings };
}

export function getPartListingsFailed(error) {
  return { type: GET_PART_LISTINGS_FAILED, error };
}

export function getPartTextSearch(params) {
  return { type: GET_PART_TEXT_SEARCH, params };
}

export function getPartTextSearchSuccess(part_listings) {
  return { type: GET_PART_TEXT_SEARCH_SUCCESS, part_listings };
}

export function getPartTextSearchFailed(error) {
  return { type: GET_PART_TEXT_SEARCH_FAILED, error };
}
