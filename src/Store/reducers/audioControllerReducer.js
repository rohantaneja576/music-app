import * as actions from "../actions/actionTypes";

export const PlayerState = {
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
};

const audioControllerState = {
  duration: null,
  current: null,
  currentSongID: null,
  sliderValue: 0,
  playingMode: PlayerState.PAUSED,
};

const audioControllerReducer = (state = audioControllerState, action) => {
  switch (action.type) {
    case actions.DURATION:
      return { ...state, duration: action.payload.duration };

    case actions.CURRENT_TIME:
      return { ...state, current: action.payload.current };

    case actions.CURRENT_SONG:
      return { ...state, currentSongID: action.payload.currentID };

    case actions.PLAYER_STATE:
      return { ...state, playingMode: action.payload.playingState };

    case actions.SLIDER_VALUE:
      return { ...state, sliderValue: action.payload.sliderTime };

    default:
      return state;
  }
};

export default audioControllerReducer;
