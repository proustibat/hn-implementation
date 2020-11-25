import { storiesActionTypes as Actions } from '../actionsTypes';

export const requestStories = () => ({
  type: Actions.REQUEST_STORIES,
  payload: {
    request: {
      url: '/newstories.json',
    },
  },
});

export const requestStory = (id: number) => ({
  type: Actions.REQUEST_STORY,
  payload: {
    request: {
      url: `/item/${id}.json`,
    },
  },
});
