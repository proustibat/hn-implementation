import storiesReducer, { initialState } from '../storiesReducer';
import { storiesActionTypes as Actions } from '../../actionsTypes';
import { stories } from '../../../fixtures/stories';
import { AxiosResponse } from 'axios';

const stateWithInitialStories = {
  items: [
    { id: 111, loaded: false, loading: false },
    { id: 222, loaded: false, loading: false },
    { id: 333, loaded: false, loading: false },
  ],
  loaded: true,
  loading: false,
};

const stateWithInitialStoriesLoadingSecond = {
  items: [
    { id: 111, loaded: false, loading: false },
    { id: 222, loaded: false, loading: true },
    { id: 333, loaded: false, loading: false },
  ],
  loaded: true,
  loading: false,
};

describe('Stories Reducer', () => {
  it('should set up default values', () => {
    // Given / When
    const state = storiesReducer(undefined, { type: Actions.INIT });

    // Then
    expect(state).toEqual(initialState);
  });

  it('should save stories and set loading and loaded booleans when requesting stories with success', () => {
    // Given
    const action = {
      type: Actions.REQUEST_STORIES_SUCCESS,
      payload: { data: stories.map(({ id }) => id) },
    };

    // When
    const state = storiesReducer(initialState, action);

    // Then
    expect(state).toMatchSnapshot();
  });

  it('should set loading state and loaded state when requesting stories begins', () => {
    // Given
    const action = { type: Actions.REQUEST_STORIES };
    const expectedStateAfterStoriesRequesting = {
      items: [],
      loading: true,
      loaded: false,
    };

    // When
    const state = storiesReducer(initialState, action);

    // Then
    expect(state).toStrictEqual(expectedStateAfterStoriesRequesting);
  });

  it('should set loading state when requesting stories fails', () => {
    // Given
    const action = { type: Actions.REQUEST_STORIES_FAILURE };
    const expectedStateAfterStoriesRequesting = {
      items: [],
      loading: false,
      loaded: false,
    };

    // When
    const state = storiesReducer(initialState, action);

    // Then
    expect(state).toStrictEqual(expectedStateAfterStoriesRequesting);
  });

  it('should save data of the requested story and set booleans correctly if success', () => {
    // Given
    const index = 1;
    const id = stateWithInitialStories.items[index].id;
    const action = {
      type: Actions.REQUEST_STORY_SUCCESS,
      payload: { data: { id } },
    };

    // When
    const state = storiesReducer(stateWithInitialStories, action);

    // Then
    expect(state.items[index]).toStrictEqual({
      id,
      loaded: true,
      loading: false,
    });
  });

  it('should set loading state of the story when requesting story begins', () => {
    // Given
    const index = 1;
    const id = stateWithInitialStories.items[index].id;
    const action = {
      type: Actions.REQUEST_STORY,
      payload: {
        request: { data: { id } } as AxiosResponse,
      },
    };

    // When
    const state = storiesReducer(stateWithInitialStories, action);

    // Then
    expect(state.items[index]).toStrictEqual({
      id,
      loaded: false,
      loading: true,
    });
  });

  it('should set loading state when requesting story fails', () => {
    // Given
    const index = 1;
    const id = stateWithInitialStories.items[index].id;
    const action = {
      type: Actions.REQUEST_STORY_FAILURE,
      payload: {
        request: { data: { id } } as AxiosResponse,
      },
    };

    // When
    const state = storiesReducer(stateWithInitialStoriesLoadingSecond, action);

    // Then
    expect(state.items[index]).toStrictEqual({
      id,
      loaded: false,
      loading: false,
    });
  });
});
