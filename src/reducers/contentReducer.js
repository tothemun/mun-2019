import {
  CLEAR_CONTENT,
  CONTENT_ERROR,
  SET_CONTENT,
  SET_CONTENT_FETCHING
} from '../actions/types';
import { createReducer } from '_utils';

const initialState = {
  content: null,
  fetched: false,
  fetching: false,
};

export default createReducer(initialState, {
  [CLEAR_CONTENT]: (state) => ({
    ...state,
    content: null
  }),
  [SET_CONTENT]: (state, payload) => ({
    ...state,
    content: payload,
    fetching: false,
    fetched: true,
    error: null
  }),
  [SET_CONTENT_FETCHING]: (state) => ({
    ...state,
    fetching: true
  }),
  [CONTENT_ERROR]: (state, payload) => ({
    ...state,
    fetching: false,
    error: payload
  })
});
