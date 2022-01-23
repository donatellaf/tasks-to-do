import { combineReducers } from "redux";
import loginReducer from "./slices/login/login";
import registerReducer from "./slices/register/register";
import tasksReducer from "./slices/tasks/tasks";

const appReducer = combineReducers({
  loginReducer,
  registerReducer,
  tasksReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "destroy_session") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
