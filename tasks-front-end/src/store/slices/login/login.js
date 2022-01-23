import { createSlice } from "@reduxjs/toolkit";

const sliceName = "login";

export const initialState = {
  username: "",
  password: "",
  isFetchingLogin: false,
  isLoggedIn: false,
  errorMsg: "",
  userAccessToken: "",
};

const loginSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    loginRequest(state, action) {
      state.isFetchingLogin = true;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.errorMsg = "";
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.isFetchingLogin = false;
      state.userAccessToken = action.payload;
    },
    loginError(state, action) {
      state.isFetchingLogin = false;
      state.username = "";
      state.password = "";
      state.errorMsg = action.payload;
    },
    logoutRequest(state, action) {
      state.username = "";
      state.password = "";
      state.isFetchingLogin = false;
      state.isLoggedIn = false;
      state.errorMsg = "";
      state.userAccessToken = "";
    },
  },
});

const { actions, reducer } = loginSlice;

export const { loginRequest, loginSuccess, loginError, logoutRequest } =
  actions;

export default reducer;
