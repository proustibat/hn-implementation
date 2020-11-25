import { storiesActionTypes as Actions } from '../actionsTypes';

export const requestStories = () => ({
  type: Actions.REQUEST_STORIES,
  payload: {
    request: {
      url: '/newstories.json',
    },
  },
});
