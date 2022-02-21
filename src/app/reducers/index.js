import { combineReducers } from "redux";
import PostReducer from "./post-reducer";

const reducers = combineReducers({
  post: PostReducer,
});

export default reducers;
