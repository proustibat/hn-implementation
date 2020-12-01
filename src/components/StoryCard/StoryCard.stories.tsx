import React from 'react';
import { Meta, Story } from '@storybook/react';
import { StoryCard as StoryCardComponent } from './index';
import { StoryKindType, StoryProps } from '../../state/reducers/storiesReducer';

export default {
  title: 'components/StoryCard',
  component: StoryCardComponent,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          StoryKindType.story,
          StoryKindType.job,
          StoryKindType.comment,
          StoryKindType.poll,
          StoryKindType.pollopt,
        ],
      },
    },
  },
} as Meta;

const Template: Story<StoryProps> = args => <StoryCardComponent {...args} />;

export const StoryCardWithALink = Template.bind({});
StoryCardWithALink.args = {
  id: 0,
  title: 'A card with a link',
  loaded: true,
  type: StoryKindType.story,
  url: 'https://www.werkspot.nl/',
  score: 8,
};
export const StoryCardWithAText = Template.bind({});
StoryCardWithAText.args = {
    id: 1,
    title: 'A card with a text',
    text: 'Here is an example of a story text',
    loaded: true,
    type: StoryKindType.story,
    score: 123,
};
