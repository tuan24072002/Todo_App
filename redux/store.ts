import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import appSlice from "./reducers/app";
import todoSlice from "./reducers/todo";
enableMapSet();

export const store = configureStore({
  reducer: {
    app: appSlice,
    todo: todoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
