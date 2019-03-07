import {
  GET_TIRE_WIDTHS,
  GET_TIRE_WIDTHS_SUCCESS,
  GET_TIRE_WIDTHS_FAILED,
  POST_TIRE_ASPECT,
  POST_TIRE_ASPECT_SUCCESS,
  POST_TIRE_ASPECT_FAILED,
  POST_TIRE_DIAMETERS,
  POST_TIRE_DIAMETERS_SUCCESS,
  POST_TIRE_DIAMETERS_FAILED,
  POST_TIRE_SEARCH,
  POST_TIRE_SEARCH_SUCCESS,
  POST_TIRE_SEARCH_FAILED,
} from '../constants/ActionTypes';

const initialSettings = {
  loader: false,
  tire_widths: undefined,
  error: undefined,
  tire_aspect: undefined,
  tire_diameters: undefined,
  tire_search: undefined,
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_TIRE_WIDTHS:
      return {
        ...state,
        loader: true,
        tire_search: undefined,
        error: undefined,
      };
    case GET_TIRE_WIDTHS_SUCCESS:
      return {
        ...state,
        loader: false,
        tire_widths: action.tire_widths,
        error: undefined,
      };
    case GET_TIRE_WIDTHS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case POST_TIRE_ASPECT:
      return {
        ...state,
        loader: true,
        tire_search: undefined,
        error: undefined,
      };
    case POST_TIRE_ASPECT_SUCCESS:
      return {
        ...state,
        loader: false,
        tire_aspect: action.tire_aspect,
        error: undefined,
      };
    case POST_TIRE_ASPECT_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case POST_TIRE_DIAMETERS:
      return {
        ...state,
        loader: true,
        tire_search: undefined,
        error: undefined,
      };
    case POST_TIRE_DIAMETERS_SUCCESS:
      return {
        ...state,
        loader: false,
        tire_diameters: action.tire_diameters,
        error: undefined,
      };
    case POST_TIRE_DIAMETERS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case POST_TIRE_SEARCH:
      return {
        ...state,
        loader: true,
        tire_search: undefined,
        error: undefined,
      };
    case POST_TIRE_SEARCH_SUCCESS:
      return {
        ...state,
        loader: false,
        tire_search: action.tire_search,
        error: undefined,
      };
    case POST_TIRE_SEARCH_FAILED:
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
