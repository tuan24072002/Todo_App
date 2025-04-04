import TodoModel from "@/models/frontend/todo";
import { ActionRequestState } from "../state";
import { commonCreateAsyncThunk } from "../thunk";
import { TodoService } from "@/services/Todo.service";
import { createSlice } from "@reduxjs/toolkit";

interface TodoState extends ActionRequestState {
  list: TodoModel[];
  item: TodoModel;
}
const initialState: TodoState = {
  list: [],
  item: TodoModel.initial(),
  status: "idle",
  statusAction: "idle",
  action: "INS",
};

export const getAll = commonCreateAsyncThunk({
  type: "todo/getAll",
  action: TodoService.getAll,
});
export const addItem = commonCreateAsyncThunk({
  type: "todo/addItem",
  action: TodoService.addItem,
});
export const editItem = commonCreateAsyncThunk({
  type: "todo/editItem",
  action: TodoService.editItem,
});
export const deleteItem = commonCreateAsyncThunk({
  type: "todo/deleteItem",
  action: TodoService.deleteItem,
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.item = action.payload;
    },
    resetState: (state) => {
      state.status = "idle";
    },
    resetActionState: (state) => {
      state.statusAction = "idle";
    },
    changeAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        const list = TodoService.listFromJson(
          action.payload.data ? action.payload.data.data : []
        );
        state.list = list;
        state.status = "completed";
      })
      .addCase(getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAll.rejected, (state, action) => {
        const error = Object(action.payload);
        state.status = "failed";
        state.error = error.message;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.statusAction = "completed";
        state.success = action.payload?.data?.message as string;
      })
      .addCase(addItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(addItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = error.message;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.statusAction = "completed";
        state.success = action.payload?.data?.message as string;
      })
      .addCase(editItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(editItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = error.message;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.statusAction = "completed";
        state.success = action.payload?.data?.message as string;
      })
      .addCase(deleteItem.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(deleteItem.rejected, (state, action) => {
        const error = Object(action.payload);
        state.statusAction = "failed";
        state.error = error.message;
      });
  },
});
export const { selectItem, resetState, resetActionState, changeAction } =
  todoSlice.actions;
export default todoSlice.reducer;
