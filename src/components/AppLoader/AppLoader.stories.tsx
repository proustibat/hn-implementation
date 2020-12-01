import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AppLoader as AppLoaderComponent } from './index';

export default {
  title: 'components/AppLoader',
  component: AppLoaderComponent,
} as Meta;

const Template: Story = args => <AppLoaderComponent {...args} />;

export const AppLoader = Template.bind({});
