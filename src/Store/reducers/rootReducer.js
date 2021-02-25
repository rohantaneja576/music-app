import { combineReducers } from "redux";
import MusicList from "../../Components/MediaContainer/MusicList";
import audioControllerReducer from "../reducers/audioControllerReducer";
import visibilityReducer from "../reducers/visibilityReducer";

export default combineReducers({
  audioControllerReducer,
  visibilityReducer,
});
