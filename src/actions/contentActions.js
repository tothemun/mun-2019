import axios from 'axios';
import { CONTENT_ERROR, SET_CONTENT, SET_CONTENT_FETCHING } from './types';

export function fetchClients() {
  return dispatch => {
    dispatch({ type: SET_CONTENT_FETCHING });
    return axios.get(`/api/collections/get/clients`, {
      'headers': { 'Authorization': `Bearer ${process.env.REACT_APP_COCKPIT_API_KEY}` }
    }).then((res) => {
      const { data } = res;
      dispatch({ type: SET_CONTENT, payload: { clients: data } } );

      return res;
    }).catch(err => {
      dispatch({ type: CONTENT_ERROR, payload: err });
    });
  }
}