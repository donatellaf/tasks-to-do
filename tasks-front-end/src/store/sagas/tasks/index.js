import { takeEvery, put, call } from "redux-saga/effects";
import {
  tasksRequestCreate,
  tasksRequestData,
  tasksRequestDataSuccess,
  tasksRequestDelete,
  tasksRequestUpdateStatus,
  tasksRequestUpdateDescription,
} from "../../slices/tasks/tasks";
import { getCollection, patch, post, remove } from "../../api/admin/index";
import { Navigate } from "react-router-dom";

function* getCollectionWorker(action) {
  try {
    const tasks = yield call(getCollection("tasks"));
    if (tasks && tasks.data.length !== 0) {
      yield put(tasksRequestDataSuccess(tasks.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* tasksCreateWorker(action) {
  try {
    const tasks = yield call(post("tasks/create", action.payload));
    if (tasks) yield put(tasksRequestData());
  } catch (error) {
    console.log(error);
  }
}

function* tasksDeleteWorker(action) {
  try {
    yield call(remove("tasks", action.payload));
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

function* tasksUpdateStatusWorker(action) {
  try {
    const tasks = yield call(
      patch("tasks", action.payload.id, { status: action.payload.status })
    );
    if (tasks) yield put(tasksRequestData());
  } catch (error) {
    console.log(error);
  }
}
function* tasksUpdateDescriptionWorker(action) {
  try {
    const tasks = yield call(
      patch("tasks/updateDescription", action.payload.id, {
        description: action.payload.description,
      })
    );
    if (tasks) yield put(tasksRequestData());
  } catch (error) {
    console.log(error);
  }
}

function* tasksSaga() {
  yield takeEvery(tasksRequestData, getCollectionWorker);
  yield takeEvery(tasksRequestCreate, tasksCreateWorker);
  yield takeEvery(tasksRequestDelete, tasksDeleteWorker);
  yield takeEvery(tasksRequestUpdateStatus, tasksUpdateStatusWorker);
  yield takeEvery(tasksRequestUpdateDescription, tasksUpdateDescriptionWorker);
}

export default tasksSaga;
