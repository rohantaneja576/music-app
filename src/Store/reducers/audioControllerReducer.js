import * as actions from "../actions/actionTypes";

const audioControllerState = {
  duration: null,
  current: null,
  prevID: null,
  nextID: null,
};

const audioControllerReducer = (state = audioControllerState, action) => {
  switch (action.type) {
    case actions.DURATION:
      return { ...state, duration: action.payload.duration };

    case actions.CURRENT_TIME:
      return { ...state, current: action.payload.current };

    case actions.PREV_SONG:
      return { ...state, prevID: action.payload.prevID };

    default:
      return state;
  }
};

export default audioControllerReducer;
