import { takeEvery, call } from "redux-saga/effects";
import { registerUser } from "../../api/auth/RegisterService";
import { registerRequest } from "../../slices/register/register";

function* registerWorker(action) {
  try {
    console.log("action", action);
    yield call(registerUser, action.payload);
  } catch (error) {
    console.log(error);
  }
}

function* registerSaga() {
  yield takeEvery(registerRequest, registerWorker);
}

export default registerSaga;
