import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules/reducer';
import { loadState } from './modules/Setup/localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedData = loadState();

const configureStore = () => (
  createStore(
    rootReducer,
    persistedData,
    composeEnhancers(applyMiddleware(thunk)),
  )
);

export default configureStore;
