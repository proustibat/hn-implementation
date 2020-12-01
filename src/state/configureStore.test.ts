import configureStore from './configureStore';
import { initialState as initialStateStories } from './reducers/storiesReducer';

describe('configureStore', () => {
  it('should set up the store', () => {
    // Given / When
    const store = configureStore();

    // Then
    expect(store.getState()).toStrictEqual({ stories: initialStateStories });
  });
});
