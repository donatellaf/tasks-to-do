import { takeEvery, call, put } from "redux-saga/effects";
import { registerUser } from "../../api/auth/RegisterService";
import { registerRequest } from "../../slices/register/register";
import { getApiGeneralProblem } from "../../../utils/apiGeneralProblem";
import { showNotificator } from "../../slices/shared/shared";

function* registerWorker(action) {
  try {
    const register = yield call(registerUser, action.payload);
    if (register.length !== 0) action.payload.onSuccess();
  } catch (error) {
    yield put(
      showNotificator({
        message: getApiGeneralProblem(error.response.data),
        severity: "error",
      })
    );
  }
}

function* registerSaga() {
  yield takeEvery(registerRequest, registerWorker);
}

export default registerSaga;
