import { all } from "redux-saga/effects";
import loginSaga from "./login";
import tasksSaga from "./tasks";
import registerSaga from "./register/index";

export default function* rootSaga() {
  yield all([loginSaga(), registerSaga(), tasksSaga()]);
}
