import {
  storiesActionTypes as Actions,
  SUFFIX_FAILURE,
  SUFFIX_SUCCESS,
} from '../actionsTypes';
import { AxiosResponse } from 'axios';

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

const LIMIT = 50;

const storiesReducer = (
  state = initialState,
  action: {
    type: Actions;
    payload: { data?: unknown; request?: AxiosResponse };
  },
) => {
  let loadedItemId: number;
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
        // slice temp while we don't manage queue or pagination
        items: (action?.payload?.data as number[]).slice(0, LIMIT).map(id => ({
          id,
          loaded: false,
          loading: false,
        })) as StoryProps[],
        loading: false,
        loaded: true,
      };
    case Actions.REQUEST_STORY:
      loadedItemId = action.payload?.request?.data?.id as number
      return {
        ...state,
        items: state.items.map(item => {
          return item.id === loadedItemId
            ? {
                ...item,
                loading: true,
                loaded: false,
              }
            : item;
        }),
      };
    case `${Actions.REQUEST_STORY}${SUFFIX_FAILURE}`:
        loadedItemId = action.payload?.request?.data?.id as number
        return {
            ...state,
            items: state.items.map(item => {
                return item.id === loadedItemId
                    ? {
                        ...item,
                        loading: false,
                        loaded: false,
                    }
                    : item;
            }),
        };
    case `${Actions.REQUEST_STORY}${SUFFIX_SUCCESS}`:
      const loadedItem = action.payload.data as StoryProps;
      return {
        ...state,
        items: state.items.map(item => {
          return item.id === loadedItem.id
            ? {
                ...item,
                ...loadedItem,
                loading: false,
                loaded: true,
              }
            : item;
        }),
      };
    default:
      return state;
  }
};

export default storiesReducer;
