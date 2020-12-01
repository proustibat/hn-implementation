import React from 'react';
import { render } from '@testing-library/react';
import { StoryCard } from './index';
import { StoryKindType, StoryProps } from '../../state/reducers/storiesReducer';

const props: StoryProps = {
  id: new Date().getTime(),
  title: 'my-title',
  score: 11,
  loaded: true,
  url: 'https://www.werkspot.nl/',
  text: 'text',
};

describe('StoryCard', () => {
  const types = [
    [StoryKindType.story, StoryKindType.story],
    [StoryKindType.comment, StoryKindType.comment],
    [StoryKindType.job, StoryKindType.job],
    [StoryKindType.poll, StoryKindType.poll],
    [StoryKindType.pollopt, StoryKindType.pollopt],
  ];

  it.each(types)('should render the StoryCard with %s type', (...args: any) => {
    const [, type] = args;

    // Given / When
    const { baseElement } = render(<StoryCard {...props} type={type} />);

    // Then
    expect(baseElement).toMatchSnapshot();
  });

  it('should not render anything if data are not loaded', () => {
    // Given / When
    const { baseElement } = render(
      <StoryCard {...props} type={StoryKindType.story} loaded={false} />,
    );

    // Then
    expect(baseElement).toMatchSnapshot();
  });

  it('should render loader', () => {
    // Given / When
    const { baseElement } = render(
      <StoryCard {...props} type={StoryKindType.story} loading={true} />,
    );

    // Then
    expect(baseElement).toMatchSnapshot();
  });
});
