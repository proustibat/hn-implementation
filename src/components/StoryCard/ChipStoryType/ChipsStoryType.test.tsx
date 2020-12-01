import React from 'react';
import {render} from '@testing-library/react';
import {ChipStoryType} from './index';
import {StoryKindType} from "../../../state/reducers/storiesReducer";

describe('ChipStoryType', () => {
    const types = [
        [StoryKindType.story, StoryKindType.story],
        [StoryKindType.comment, StoryKindType.comment],
        [StoryKindType.job, StoryKindType.job],
        [StoryKindType.poll, StoryKindType.poll],
        [StoryKindType.pollopt, StoryKindType.pollopt],
    ];

    it.each(types)('should render the chip with %s icon', (...args: any) => {
        const [, type] = args;

        // Given / When
        const { baseElement } = render(
            <ChipStoryType type={type} />,
        );

        // Then
        expect(baseElement).toMatchSnapshot();
    });
});
