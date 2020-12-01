import React from 'react';
import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { RootReducersType } from './state/reducers';

export const getMockedStore = (
  initialState: RootReducersType = { stories: { items: [], loading: false, loaded: false } },
) => {
  const createMockStore = configureStore([thunk]);
  const mockStore: MockStore = createMockStore(initialState);
  return mockStore;
};

export const withProvider = (WrappedComponent: React.ComponentType<any>) => (
  initialState: RootReducersType,
) => (props: any) => {
  return (
    <Provider store={getMockedStore(initialState)}>
      <WrappedComponent {...props} />
    </Provider>
  );
};

export const withRouter = (children: any) => {
  return (
    <MemoryRouter>
      <Route>{children}</Route>
    </MemoryRouter>
  );
};