import { combineReducers } from "redux";
import questionsReducer from "../reducers/questionsReducer";
import postStatusReducer from "../reducers/postStatusReducer";
import authReducer from "./authReducer";

export default combineReducers({
  questionsFields: questionsReducer,
  postStatus: postStatusReducer,
  auth: authReducer
});
