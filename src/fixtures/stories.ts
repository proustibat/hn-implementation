import { StoryKindType, StoryProps } from '../state/reducers/storiesReducer';

export const stories: StoryProps[] = [
  {
    id: 111,
    title: 'title 1',
    type: StoryKindType.story,
    url: 'https://www.werkspot.nl',
    score: 123,
  },
  {
    id: 222,
    title: 'title 2',
    type: StoryKindType.story,
    url: 'https://www.github.com',
    score: 456,
  },
  {
    id: 333,
    title: 'title 3',
    type: StoryKindType.story,
    text: 'bla bli blou',
    score: 789,
  },
];
