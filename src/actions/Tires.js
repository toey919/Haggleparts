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

export function getTireWidths() {
  return { type: GET_TIRE_WIDTHS };
}

export function getTireWidthsSuccess(tire_widths) {
  return { type: GET_TIRE_WIDTHS_SUCCESS, tire_widths };
}

export function getTireWidthsFailed(error) {
  return { type: GET_TIRE_WIDTHS_FAILED, error };
}

export function postTireAspect(data) {
  return { type: POST_TIRE_ASPECT, data };
}

export function postTireAspectSuccess(tire_aspect) {
  return { type: POST_TIRE_ASPECT_SUCCESS, tire_aspect };
}

export function postTireAspectFailed(error) {
  return { type: POST_TIRE_ASPECT_FAILED, error };
}

export function postTireDiameters(data) {
  return { type: POST_TIRE_DIAMETERS, data };
}

export function postTireDiametersSuccess(tire_diameters) {
  return { type: POST_TIRE_DIAMETERS_SUCCESS, tire_diameters };
}

export function postTireDiametersFailed(error) {
  return { type: POST_TIRE_DIAMETERS_FAILED, error };
}

export function postTireSearch(data) {
  return { type: POST_TIRE_SEARCH, data };
}

export function postTireSearchSuccess(tire_search) {
  return { type: POST_TIRE_SEARCH_SUCCESS, tire_search };
}

export function postTireSearchFailed(error) {
  return { type: POST_TIRE_SEARCH_FAILED, error };
}
