import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { RootStateOrAny } from 'react-redux';

const middleware = [thunk];

const configureStore = (preloadedState?: RootStateOrAny) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
};

export default configureStore;
