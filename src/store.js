import { createStore, compose } from 'redux';
import reducer from './reducer';

/* Enable redux dev tools only in development.
 * We suggest using React Native Debugger for debugging:
 * https://github.com/jhen0409/react-native-debugger
 */
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers();

// create the store
const store = createStore(reducer, enhancer);

export default store;
