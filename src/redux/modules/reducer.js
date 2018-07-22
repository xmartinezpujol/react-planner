import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import credentials from './Login/credentials';
import status from './Global/status';

const rootReducer = combineReducers({
  credentials,
  status,
  form: formReducer,
});

export default rootReducer;
