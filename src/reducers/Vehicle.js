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

const initialSettings = {
  loader: false,
  years: undefined,
  error: undefined,
  makes: undefined,
  models: undefined,
  categories: undefined,
  part_types: undefined,
  engines: undefined,
  search_results: undefined,
  part_listings: undefined,
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_VEHICLE_YEARS:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_VEHICLE_YEARS_SUCCESS:
      return {
        ...state,
        loader: false,
        years: action.years,
        error: undefined,
      };
    case GET_VEHICLE_YEARS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_VEHICLE_MAKES:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_VEHICLE_MAKES_SUCCESS:
      return {
        ...state,
        loader: false,
        makes: action.makes,
        error: undefined,
      };
    case GET_VEHICLE_MAKES_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_VEHICLE_MODELS:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_VEHICLE_MODELS_SUCCESS:
      return {
        ...state,
        loader: false,
        models: action.models,
        error: undefined,
      };
    case GET_VEHICLE_MODELS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_VEHICLE_CATEGORIES:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_VEHICLE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loader: false,
        categories: action.categories,
        error: undefined,
      };
    case GET_VEHICLE_CATEGORIES_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_VEHICLE_PART_TYPES:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_VEHICLE_PART_TYPES_SUCCESS:
      return {
        ...state,
        loader: false,
        part_types: action.part_types,
        error: undefined,
      };
    case GET_VEHICLE_PART_TYPES_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_VEHICLE_ENGINES:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_VEHICLE_ENGINES_SUCCESS:
      return {
        ...state,
        loader: false,
        engines: action.engines,
        error: undefined,
      };
    case GET_VEHICLE_ENGINES_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_PART_SEARCH:
      return {
        ...state,
        loader: true,
        search_results: undefined,
        error: undefined,
      };
    case GET_PART_SEARCH_SUCCESS:
      return {
        ...state,
        loader: false,
        search_results: action.search_results,
        error: undefined,
      };
    case GET_PART_SEARCH_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_PART_LISTINGS:
      return {
        ...state,
        loader: true,
        part_listings: undefined,
        error: undefined,
      };
    case GET_PART_LISTINGS_SUCCESS:
      return {
        ...state,
        loader: false,
        part_listings: action.part_listings,
        error: undefined,
      };
    case GET_PART_LISTINGS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_PART_TEXT_SEARCH:
      return {
        ...state,
        loader: true,
        part_listings: undefined,
        error: undefined,
      };
    case GET_PART_TEXT_SEARCH_SUCCESS:
      return {
        ...state,
        loader: false,
        part_listings: action.part_listings,
        error: undefined,
      };
    case GET_PART_TEXT_SEARCH_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default settings;
