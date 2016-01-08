import {
  DOWN_KEY_PRESSED,
  ENTER_KEY_PRESSED,
  ESC_KEY_PRESSED,
  FETCH_DIRECTORY_SUCCEEDED,
  LEFT_KEY_PRESSED,
  RIGHT_KEY_PRESSED,
  UP_KEY_PRESSED
} from 'constants/ActionTypes';

const initialState = {
  basePath: null,
  currentPath: null,
  currentPathChildren: [],
  finalPath: null,
  pendingSelectedChild: null,
  selectedChildPathIndex: 0
};

const getPreviousSubdirectoryIndex = ({ currentIndex, childCount }) => {
  return childCount ? (currentIndex === 0 ? childCount - 1 : currentIndex - 1) : currentIndex;
};

const getNextSubdirectoryIndex = ({ currentIndex, childCount }) => {
  return childCount ? (currentIndex === childCount - 1 ? 0 : currentIndex + 1) : currentIndex;
};

export function directory(state = initialState, action) {
  let newPath;

  switch (action.type) {
    case FETCH_DIRECTORY_SUCCEEDED:
      const newSelectedChildIndex = action.children.indexOf(state.pendingSelectedChild);

      return Object.assign({}, state, {
        basePath: state.basePath || action.path,
        currentPath: action.path,
        currentPathChildren: action.children,
        selectedChildPathIndex: newSelectedChildIndex !== -1 ? newSelectedChildIndex : 0
      });

    case DOWN_KEY_PRESSED:
      return Object.assign({}, state, { selectedChildPathIndex : getNextSubdirectoryIndex({
        currentIndex: state.selectedChildPathIndex,
        childCount: state.currentPathChildren.length
      })});

    case UP_KEY_PRESSED:
      return Object.assign({}, state, { selectedChildPathIndex : getPreviousSubdirectoryIndex({
        currentIndex: state.selectedChildPathIndex,
        childCount: state.currentPathChildren.length
      })});

    case RIGHT_KEY_PRESSED:
      newPath = state.currentPathChildren[state.selectedChildPathIndex];

      if (newPath) {
        return Object.assign({}, state, {
          currentPath: `${state.currentPath}/${newPath}`,
          currentPathChildren: [],
          selectedChildPathIndex: 0
        });
      }

      break;

    case LEFT_KEY_PRESSED:
      const pathParts = state.currentPath.split('/');
      newPath = pathParts.slice(0, pathParts.length - 1).join('/');

      if (newPath.length >= state.basePath.length) {
        return Object.assign({}, state, {
          currentPath: newPath,
          currentPathChildren: [],
          selectedChildPathIndex: 0,
          pendingSelectedChild: pathParts[pathParts.length - 1]
        });
      }

      break;

    case ENTER_KEY_PRESSED:
      const selectedFinalPath = state.currentPathChildren[state.selectedChildPathIndex];
      const finalPath = `${state.currentPath}/${selectedFinalPath || ''}`;
      return Object.assign({}, state, { finalPath });

    case ESC_KEY_PRESSED:
      return Object.assign({}, state, { finalPath: null });
  }

  return state;
}
