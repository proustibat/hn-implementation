import { storiesActionTypes as Actions } from '../actionsTypes';
import axios from 'axios';

export const getStories = () => async (dispatch: any) => {
  dispatch({
    type: Actions.GET_STORIES,
  });
  try {
    const res = await axios.get(
      `https://hacker-news.firebaseio.com/v0/newstories.json`,
    );
    dispatch({
      type: Actions.GET_STORIES_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: Actions.GET_STORIES_FAILURE,
      payload: console.log(e),
    });
  }
};
