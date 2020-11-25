import {
  storiesActionTypes as Actions,
  SUFFIX_FAILURE,
  SUFFIX_SUCCESS,
} from '../actionsTypes';

export type StoryProps = {
  id: number;
  deleted?: boolean; //	true if the item is deleted.
  type?: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'; //	The type of item.
  by?: string; //	The username of the item's author.
  time?: number; //	Creation date of the item, in Unix Time.
  text?: string; //	The comment, story or poll text. HTML.
  dead?: boolean; //	true if the item is dead.
  parent?: number; //	The comment's parent: either another comment or the relevant story.
  poll?: number; //	The pollopt's associated poll.
  kids?: number[]; //	The ids of the item's comments, in ranked display order.
  url?: string; //	The URL of the story.
  score?: number; //	The story's score, or the votes for a pollopt.
  title?: string; //	The title of the story, poll or job. HTML.
  parts?: number[]; //	A list of related pollopts, in display order.
  descendants?: number; //	In the case of stories or polls, the total comment count.
  loading?: boolean;
  loaded?: boolean;
};

export type StoriesReducerType = {
  items: StoryProps[];
  loading: boolean;
  loaded: boolean;
};

const initialState: StoriesReducerType = {
  items: [],
  loading: false,
  loaded: false,
};

const storiesReducer = (
  state = initialState,
  action: { type: Actions; payload: { data?: unknown } },
) => {
  switch (action.type) {
    case Actions.REQUEST_STORIES:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${Actions.REQUEST_STORIES}${SUFFIX_FAILURE}`:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case `${Actions.REQUEST_STORIES}${SUFFIX_SUCCESS}`:
      return {
        ...state,
        items: (action?.payload?.data as number[]).map(id => ({
          id,
          loaded: false,
        })) as StoryProps[],
        loading: false,
        loaded: true,
      };
    case Actions.REQUEST_STORY:
      return {
        ...state,
      };
    case `${Actions.REQUEST_STORY}${SUFFIX_FAILURE}`:
      return {
        ...state,
      };
    case `${Actions.REQUEST_STORY}${SUFFIX_SUCCESS}`:
      console.log(action?.payload?.data);
      return {
        ...state,
        items: state.items.map(item => {
          const loadedItem = action.payload.data as StoryProps;
          return item.id === loadedItem.id
            ? {
                ...item,
                ...loadedItem,
              }
            : item;
        }),
      };
    default:
      return state;
  }
};

export default storiesReducer;
