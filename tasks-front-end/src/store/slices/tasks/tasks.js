import { createSlice } from "@reduxjs/toolkit";

const sliceName = "tasks";

export const initialState = {
  data: [],
  isFetchingData: false,
};

const tasksSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    tasksRequestData(state, action) {},
    tasksRequestDataSuccess(state, action) {
      state.isFetchingData = false;
      state.data = action.payload;
    },
    tasksRequestCreate(state, action) {
      state.isFetchingData = true;
    },
    tasksRequestCreateSuccess(state, action) {
      state.data = action.payload;
      state.isFetchingData = false;
    },
    tasksRequestDelete(state) {
      state.isFetchingData = true;
    },
    tasksRequestDeleteSuccess(state, action) {
      state.isFetchingData = false;
    },
    tasksRequestUpdateStatus(state) {
      state.isFetchingData = true;
    },
    tasksRequestUpdateStatusSuccess(state, action) {
      state.isFetchingData = false;
    },
    tasksRequestUpdateDescription(state) {
      state.isFetchingData = true;
    },
    tasksRequestUpdateDescriptionSuccess(state, action) {
      state.isFetchingData = false;
    },
  },
});

const { actions, reducer } = tasksSlice;

export const {
  tasksRequestData,
  tasksRequestDataSuccess,
  tasksRequestCreate,
  tasksRequestCreateSuccess,
  tasksRequestDelete,
  tasksRequestDeleteSuccess,
  tasksRequestUpdateStatus,
  tasksRequestUpdateStatusSuccess,
  tasksRequestUpdateDescription,
  tasksRequestUpdateDescriptionSuccess,
} = actions;

export default reducer;
