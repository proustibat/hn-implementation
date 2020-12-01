import { requestStories, requestStory } from '../storiesActions';
import { storiesActionTypes } from '../../actionsTypes';

describe('Stories Actions', () => {
  it('should set up request stories action with right type and payload', () => {
    // Given / When
    const action = requestStories();

    // Then
    expect(action).toStrictEqual({
      type: storiesActionTypes.REQUEST_STORIES,
      payload: { request: { url: '/newstories.json', method: 'GET' } },
    });
  });

  it('should set up sending message action with right type and payload', () => {
    // Given / When
    const id = 222;
    const action = requestStory(id);

    // Then
    expect(action).toStrictEqual({
      type: storiesActionTypes.REQUEST_STORY,
      payload: {
        request: { url: `/item/${id}.json`, method: 'GET', data: { id } },
      },
    });
  });
});
