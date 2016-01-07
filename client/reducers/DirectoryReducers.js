import {
  DOWN_KEY_PRESSED,
  FETCH_DIRECTORY_SUCCEEDED,
  UP_KEY_PRESSED,
  ENTER_KEY_PRESSED
} from 'constants/ActionTypes';

const initialState = {
  currentPath: null,
  currentPathChildren: [],
  selectedChildPathIndex: null
};

export function directory(state = initialState, action) {
  switch (action.type) {
    case FETCH_DIRECTORY_SUCCEEDED:
      return Object.assign({}, state, {
        currentPath: action.path,
        currentPathChildren: action.children
      });

    case DOWN_KEY_PRESSED:
      if (state.currentPathChildren.length) {
        if (state.selectedChildPathIndex === null) {
          return Object.assign({}, state, { selectedChildPathIndex: 0 });
        }

        if (state.selectedChildPathIndex === state.currentPathChildren.length - 1) {
          return Object.assign({}, state, { selectedChildPathIndex: null });
        }

        return Object.assign({}, state, { selectedChildPathIndex: state.selectedChildPathIndex + 1 });
      }

      break;

    case UP_KEY_PRESSED:
      if (state.currentPathChildren.length) {
        if (state.selectedChildPathIndex === null) {
          return Object.assign({}, state, { selectedChildPathIndex: state.currentPathChildren.length - 1 });
        }

        if (state.selectedChildPathIndex === 0) {
          return Object.assign({}, state, { selectedChildPathIndex: null });
        }

        return Object.assign({}, state, { selectedChildPathIndex: state.selectedChildPathIndex - 1 });
      }

      break;

    case ENTER_KEY_PRESSED:
      if (state.selectedChildPathIndex !== null) {
        return Object.assign({}, state, {
          currentPath: `${state.currentPath}/${state.currentPathChildren[state.selectedChildPathIndex]}`,
          currentPathChildren: [],
          selectedChildPathIndex: null
        });
      } else {
        console.log(`Confirm selection for ${state.currentPath}`);
      }
  }

  return state;
}
