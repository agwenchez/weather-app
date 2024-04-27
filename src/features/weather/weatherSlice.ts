/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
// import { AuthState } from "../../@types";

const INITIAL_STATE = {
    weather: {}
}
const weatherSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,

  reducers: {
    setCredentials: (_, action: PayloadAction) => {
      // @ts-ignore
      return { ...action.payload };
    },
    logout: () => {
    //   return INITIAL_STATE;
    },
  },
});

export const { setCredentials, logout } = weatherSlice.actions;
export default weatherSlice.reducer;
// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectCurrentToken = (state: RootState) => state.auth.token;
