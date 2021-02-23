import * as actions from "../actions/actionTypes";

const visibilityState = {
  isVisible: false,
};

const visibilityReducer = (state = visibilityState, action) => {
  switch (action.type) {
    case actions.VISIBILITY:
      return { ...state, isVisible: action.payload.isVisible };

    default:
      return state;
  }
};

export default visibilityReducer;
