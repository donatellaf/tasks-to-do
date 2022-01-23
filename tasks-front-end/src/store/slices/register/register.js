import { createSlice } from "@reduxjs/toolkit";

const sliceName = "register";

const initialState = {
  errorMsg: "",
  isFetchingRegister: false,
  userExist: false,
  msg: "",
};

const registerSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    registerRequest(state) {
      state.isFetchingRegister = true;
      state.errorMsg = "";
    },
    registerSuccess(state, action) {
      state.isFetchingRegister = false;
      state.msg = action.payload;
    },
    registerError(state, action) {
      state.isFetchingRegister = false;
      state.errorMsg = action.payload;
    },
    registerExist(state, action) {
      state.userExist = action.payload;
    },
  },
});

const { actions, reducer } = registerSlice;

export const {
  registerRequest,
  registerSuccess,
  registerError,
  registerExist,
} = actions;

export default reducer;
