import { storiesActionTypes as Actions } from '../actionsTypes';

// export type StoryProps = {
//   id: number;
//   deleted?: boolean; //	true if the item is deleted.
//   type?: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'; //	The type of item.
//   by?: string; //	The username of the item's author.
//   time?: number; //	Creation date of the item, in Unix Time.
//   text?: string; //	The comment, story or poll text. HTML.
//   dead?: boolean; //	true if the item is dead.
//   parent?: number; //	The comment's parent: either another comment or the relevant story.
//   poll?: number; //	The pollopt's associated poll.
//   kids?: number[]; //	The ids of the item's comments, in ranked display order.
//   url?: string; //	The URL of the story.
//   score?: number; //	The story's score, or the votes for a pollopt.
//   title?: string; //	The title of the story, poll or job. HTML.
//   parts?: number[]; //	A list of related pollopts, in display order.
//   descendants?: number; //	In the case of stories or polls, the total comment count.
// };

export type StoriesReducerType = {
  items: number[];
  loading: boolean;
};

const initialState: StoriesReducerType = {
  items: [],
  loading: false,
};

const storiesReducer = (
  state = initialState,
  action: { type: Actions; payload: number[] },
) => {
  switch (action.type) {
    case Actions.GET_STORIES:
      return {
        ...state,
        loading: true,
      };
    case Actions.GET_STORIES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case Actions.GET_STORIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default storiesReducer;
