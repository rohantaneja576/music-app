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

export const prevSong = (prevID) => ({
  type: actions.PREV_SONG,
  payload: {
    prevID,
  },
});
