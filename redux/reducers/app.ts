import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  description: string;
  title: string;
}

const initialState: AppState = {
  description:
    "A simple and intuitive web-based todo app for efficient task management.",
  title:
    "Todo App | A simple and intuitive web-based application for efficient task management.",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setDescription, setTitle } = appSlice.actions;
export default appSlice.reducer;
