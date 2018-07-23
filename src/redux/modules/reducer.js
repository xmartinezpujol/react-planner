import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import credentials from './Login/credentials';
import status from './Global/status';
import weeklyslots from './Slots/weekly';

const rootReducer = combineReducers({
  credentials,
  status,
  weeklyslots,
  form: formReducer,
});

export default rootReducer;
