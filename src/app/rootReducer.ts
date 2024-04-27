import { combineReducers } from "@reduxjs/toolkit";
import { weatherApi } from "./services";

const rootReducer = combineReducers({
//   auth: authReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
