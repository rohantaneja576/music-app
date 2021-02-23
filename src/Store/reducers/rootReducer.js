import { combineReducers } from "redux";
import audioControllerReducer from "../reducers/audioControllerReducer";
import visibilityReducer from "../reducers/visibilityReducer";

export default combineReducers({
  audioControllerReducer,
  visibilityReducer,
});
