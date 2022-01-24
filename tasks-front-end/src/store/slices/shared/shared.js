import { createSlice } from "@reduxjs/toolkit";

const sliceName = "shared";

export const initialState = {
  error: null,
  notificator: { message: null, open: false, severity: null },
};

const sharedSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    showNotificator(state, action) {
      state.notificator.message = action.payload.message;
      state.notificator.severity = action.payload.severity;
      state.notificator.open = true;
    },
    hideNotificator(state, action) {
      state.notificator.message = "";
      state.notificator.open = false;
    },
  },
});

const { actions, reducer } = sharedSlice;

export const { showNotificator, hideNotificator } = actions;

export default reducer;
