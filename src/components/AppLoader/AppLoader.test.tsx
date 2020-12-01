import React from 'react';
import { render } from "@testing-library/react";
import { AppLoader } from './index';

describe('AppLoader', () => {
  it('should render correctly by default', () => {
    // Given / When
    const { container } = render(<AppLoader />);

    // Then
    expect(container).toMatchSnapshot();
  });
});
