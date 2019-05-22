import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import contentReducer from './contentReducer';

export default combineReducers({
  routing: routerReducer,
  contentReducer,
  form: formReducer
});
