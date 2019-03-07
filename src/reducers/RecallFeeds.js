import {
  GET_VEHICLE_FEED,
  GET_VEHICLE_FEED_SUCCESS,
  GET_VEHICLE_FEED_FAILED,
  GET_TIRE_FEED,
  GET_TIRE_FEED_SUCCESS,
  GET_TIRE_FEED_FAILED,
  GET_CHILD_FEED,
  GET_CHILD_FEED_SUCCESS,
  GET_CHILD_FEED_FAILED,
  GET_RECALL_SEARCH,
  GET_RECALL_SEARCH_SUCCESS,
  GET_RECALL_SEARCH_FAILED,
  GET_SAFETY_SEARCH,
  GET_SAFETY_SEARCH_SUCCESS,
  GET_SAFETY_SEARCH_FAILED,
  GET_SAFETY_DETAILS,
  GET_SAFETY_DETAILS_SUCCESS,
  GET_SAFETY_DETAILS_FAILED,
  CLEAR_STATE,
  GET_COMPLAINT_SEARCH,
  GET_COMPLAINT_SEARCH_SUCCESS,
  GET_COMPLAINT_SEARCH_FAILED,
  GET_VIN_DECODE,
  GET_VIN_DECODE_SUCCESS,
  GET_VIN_DECODE_FAILED,
} from '../constants/ActionTypes';

const initialSettings = {
  loader: false,
  vehicle_feed: undefined,
  error: undefined,
  tire_feed: undefined,
  child_feed: undefined,
  recall_results: undefined,
  safety_results: undefined,
  safety_details: undefined,
  complaint_results: undefined,
  vin_decode: undefined,
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case GET_VEHICLE_FEED:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_VEHICLE_FEED_SUCCESS:
      return {
        ...state,
        loader: false,
        vehicle_feed: action.vehicle_feed,
        error: undefined,
      };
    case GET_VEHICLE_FEED_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_TIRE_FEED:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_TIRE_FEED_SUCCESS:
      return {
        ...state,
        loader: false,
        tire_feed: action.tire_feed,
        error: undefined,
      };
    case GET_TIRE_FEED_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_CHILD_FEED:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_CHILD_FEED_SUCCESS:
      return {
        ...state,
        loader: false,
        child_feed: action.child_feed,
        error: undefined,
      };
    case GET_CHILD_FEED_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_RECALL_SEARCH:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_RECALL_SEARCH_SUCCESS:
      return {
        ...state,
        loader: false,
        recall_results: action.recall_results,
        error: undefined,
      };
    case GET_RECALL_SEARCH_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_SAFETY_SEARCH:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_SAFETY_SEARCH_SUCCESS:
      return {
        ...state,
        loader: false,
        safety_results: action.safety_results,
        error: undefined,
      };
    case GET_SAFETY_SEARCH_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_SAFETY_DETAILS:
      return {
        ...state,
        loader: true,
        safety_details: undefined,
        error: undefined,
      };
    case GET_SAFETY_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        safety_details: action.safety_details,
        error: undefined,
      };
    case GET_SAFETY_DETAILS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case CLEAR_STATE:
      return {
        ...state,
        safety_details: undefined,
      };
    case GET_COMPLAINT_SEARCH:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_COMPLAINT_SEARCH_SUCCESS:
      return {
        ...state,
        loader: false,
        complaint_results: action.complaint_results,
        error: undefined,
      };
    case GET_COMPLAINT_SEARCH_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case GET_VIN_DECODE:
      return {
        ...state,
        loader: true,
        error: undefined,
      };
    case GET_VIN_DECODE_SUCCESS:
      return {
        ...state,
        loader: false,
        vin_decode: action.vin_decode,
        error: undefined,
      };
    case GET_VIN_DECODE_FAILED:
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
