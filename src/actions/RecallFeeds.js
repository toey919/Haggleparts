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

export function getVehicleFeed() {
  return { type: GET_VEHICLE_FEED };
}

export function getVehicleFeedSuccess(vehicle_feed) {
  return { type: GET_VEHICLE_FEED_SUCCESS, vehicle_feed };
}

export function getVehicleFeedFailed(error) {
  return { type: GET_VEHICLE_FEED_FAILED, error };
}

export function getTireFeed() {
  return { type: GET_TIRE_FEED };
}

export function getTireFeedSuccess(tire_feed) {
  return { type: GET_TIRE_FEED_SUCCESS, tire_feed };
}

export function getTireFeedFailed(error) {
  return { type: GET_TIRE_FEED_FAILED, error };
}

export function getChildFeed() {
  return { type: GET_CHILD_FEED };
}

export function getChildFeedSuccess(child_feed) {
  return { type: GET_CHILD_FEED_SUCCESS, child_feed };
}

export function getChildFeedFailed(error) {
  return { type: GET_CHILD_FEED_FAILED, error };
}

export function getRecallSearch(params) {
  return { type: GET_RECALL_SEARCH, params };
}

export function getRecallSearchSuccess(recall_results) {
  return { type: GET_RECALL_SEARCH_SUCCESS, recall_results };
}

export function getRecallSearchFailed(error) {
  return { type: GET_RECALL_SEARCH_FAILED, error };
}

export function getSafetySearch(params) {
  return { type: GET_SAFETY_SEARCH, params };
}

export function getSafetySearchSuccess(safety_results) {
  return { type: GET_SAFETY_SEARCH_SUCCESS, safety_results };
}

export function getSafetySearchFailed(error) {
  return { type: GET_SAFETY_SEARCH_FAILED, error };
}

export function getSafetyDetails(VehicleId) {
  return { type: GET_SAFETY_DETAILS, VehicleId };
}

export function getSafetyDetailsSuccess(safety_details) {
  return { type: GET_SAFETY_DETAILS_SUCCESS, safety_details };
}

export function getSafetyDetailsFailed(error) {
  return { type: GET_SAFETY_DETAILS_FAILED, error };
}

export function clearState() {
  return { type: CLEAR_STATE };
}

export function getComplaintSearch(params) {
  return { type: GET_COMPLAINT_SEARCH, params };
}

export function getComplaintSearchSuccess(complaint_results) {
  return { type: GET_COMPLAINT_SEARCH_SUCCESS, complaint_results };
}

export function getComplaintSearchFailed(error) {
  return { type: GET_COMPLAINT_SEARCH_FAILED, error };
}

export function getVinDecode(vin) {
  return { type: GET_VIN_DECODE, vin };
}

export function getVinDecodeSuccess(vin_decode) {
  return { type: GET_VIN_DECODE_SUCCESS, vin_decode };
}

export function getVinDecodeFailed(error) {
  return { type: GET_VIN_DECODE_FAILED, error };
}
