import { storiesActionTypes as Actions } from '../actionsTypes';

export enum SearchKind {
  TOP = 'top',
  BEST = 'best',
  NEW = 'new',
}

export const requestStories = (searchKind: SearchKind = SearchKind.NEW) => ({
  type: Actions.REQUEST_STORIES,
  payload: {
    request: {
      url: `/${searchKind}stories.json`,
      method: 'GET',
    },
  },
});

export const requestStory = (id: number) => ({
  type: Actions.REQUEST_STORY,
  payload: {
    request: {
      url: `/item/${id}.json`,
      method: 'GET',
      data: { id },
    },
  },
});
