import { renderComponent } from 'utils/TestUtils';

import PlaybackControls from 'PlaybackControls';

describe('components/PlaybackControls', () => {
  let renderedPlaybackControls;

  beforeEach(() => {
    renderedPlaybackControls = renderComponent(PlaybackControls);
  });

  it('is a div', () => {
    expect(renderedPlaybackControls.type).toBe('div');
  });

  it('has the correct styles', () => {

  });

  it('has no opacity', () => {
    expect(renderedPlaybackControls.props.style.opacity).toBe(0);
  });

  it('transitions the opacity changes', () => {
    expect(renderedPlaybackControls.props.style.transition).toBe('opacity 0.5s ease-in-out');
  });

  it('has the correct zIndex', () => {
    expect(renderedPlaybackControls.props.style.zIndex).toBe(1);
  });
});
