import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './index';
import { RootReducersType } from '../../state/reducers';
import { withProvider, withRouter } from '../../test-utils';
import { stories } from '../../fixtures/stories';

const stateWithStories: RootReducersType = {
  stories: {
    items: stories.map(story => ({ ...story, loaded: true, loading: false })),
    loading: false,
    loaded: true,
  },
};

const stateWithStoriesLoadingOne: RootReducersType = {
  stories: {
    items: stories.map(story => ({ ...story, loaded: story.id !== stories[1].id, loading: story.id === stories[1].id })),
    loading: false,
    loaded: false,
  },
};

const stateWithoutStories: RootReducersType = {
  stories: {
    items: [],
    loading: false,
    loaded: false,
  },
};

const stateLoadingStories: RootReducersType = {
  stories: {
    items: [],
    loading: true,
    loaded: false,
  },
};


describe('Home view', () => {
  describe.each([
    ['the store has all stories and every story are loaded', stateWithStories],
    [
      'the store has all stories and one is loading',
      stateWithStoriesLoadingOne,
    ],
    ['the store has not any stories', stateWithoutStories],
    ['the store is loading stories', stateLoadingStories],
  ])('given %s', (_, state) => {
    it('should render the view correctly by default', () => {
      // Given
      const ProvidedHome = withProvider(Home)(state);

      // When
      const { container } = render(withRouter(ProvidedHome));

      // Then
      expect(container).toMatchSnapshot();
    });
  });
});
