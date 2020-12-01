import React from 'react';
import {Meta, Story} from '@storybook/react';

import {ChipStoryType as ChipStoryTypeComponent, ChipStoryTypeProps} from './index';
import {StoryKindType} from "../../../state/reducers/storiesReducer";

export default {
  title: 'components/StoryCard/ChipStoryType',
  component: ChipStoryTypeComponent,
} as Meta;

const Template: Story<ChipStoryTypeProps> = args => <ChipStoryTypeComponent {...args} />;

export const ChipStoryType = Template.bind({});
ChipStoryType.args = {
    type: StoryKindType.story
}