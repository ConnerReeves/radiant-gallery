import { isElementOfType, renderComponent } from '../../utils/TestUtils';

import App from '../App';
import AssetControllerContainer from '../../containers/AssetControllerContainer';
import PlaybackControlsContainer from '../../containers/PlaybackControlsContainer';

describe('components/App', () => {
  describe('#render', () => {
    let renderedApp;

    beforeEach(() => {
      renderedApp = renderComponent(App);
    });

    it('is a div', () => {
      expect(renderedApp.type).toBe('div');
    });

    it('has a PlaybackControlsContainer as its first child', () => {
      expect(isElementOfType(renderedApp.props.children[0], PlaybackControlsContainer)).toBe(true);
    });

    it('has a AssetControllerContainer as its second child', () => {
      expect(isElementOfType(renderedApp.props.children[1], AssetControllerContainer)).toBe(true);
    });
  });
});
