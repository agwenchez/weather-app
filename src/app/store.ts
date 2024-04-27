import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { weatherApi } from "./services";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loadState } from "./localStorage";
import rootReducer, { RootState } from "./rootReducer";

const persistedState = loadState();

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: persistedState,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(weatherApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
export default store;
