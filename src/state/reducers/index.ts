import { combineReducers } from 'redux';
import stories, {StoriesReducerType} from './storiesReducer';
export type RootReducersType = {
    stories: StoriesReducerType
};

export default combineReducers({
  stories,
});
