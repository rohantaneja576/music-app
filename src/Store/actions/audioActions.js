import * as actions from "./actionTypes";

export const totalTime = (duration) => ({
  type: actions.DURATION,
  payload: {
    duration,
  },
});

export const activeTime = (current) => ({
  type: actions.CURRENT_TIME,
  payload: {
    current,
  },
});

export const currentSong = (currentID) => ({
  type: actions.CURRENT_SONG,
  payload: {
    currentID,
  },
});

export const playerState = (playingState) => ({
  type: actions.PLAYER_STATE,
  payload: {
    playingState,
  },
});

export const sliderValue = (sliderTime) => ({
  type: actions.SLIDER_VALUE,
  payload: {
    sliderTime,
  },
});
