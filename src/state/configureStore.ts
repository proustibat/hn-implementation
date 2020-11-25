import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { RootStateOrAny } from 'react-redux';

const client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  responseType: 'json',
});

const middlewares = [
  thunk,
  axiosMiddleware(client),
];

const configureStore = (preloadedState?: RootStateOrAny) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
};

export default configureStore;
