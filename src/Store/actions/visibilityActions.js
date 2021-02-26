import * as actions from "./actionTypes";

export const visibleAudioController = () => ({
  type: actions.VISIBILITY,
  payload: {
    isVisible: true,
  },
});
