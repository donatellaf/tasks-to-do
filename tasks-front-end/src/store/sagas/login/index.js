import { call, put, takeEvery } from "redux-saga/effects";
import { getUser } from "../../api/auth/LoginService";
import { loginRequest, loginSuccess } from "../../slices/login/login";
import { getApiGeneralProblem } from "../../../utils/apiGeneralProblem";
import { showNotificator } from "../../slices/shared/shared";

function* loginWorker(action) {
  try {
    const user = yield call(getUser, action.payload);
    if (user.length !== 0) {
      yield put(loginSuccess(user.data.accessToken));
    }
  } catch (error) {
    yield put(
      showNotificator({
        message: getApiGeneralProblem(error.response.data),
        severity: "error",
      })
    );
  }
}

export default function* loginSaga() {
  yield takeEvery(loginRequest, loginWorker);
}
