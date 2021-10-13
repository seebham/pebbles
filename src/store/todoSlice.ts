import { createSlice } from "@reduxjs/toolkit";

// state: Array of Obj - Obj:  { id: 197, title: "Post on LinkedIn", desc: "description", status: "", isDone: false, created_at: "2020-07-20T14:00:00.000Z", updated_at: "2020-07-20T14:00:00.000Z", due_date: "2020-07-20T14:00:00.000Z" }
export interface TodoState {
  id: number;
  title: string;
  desc: string;
  status: string;
  isDone: boolean;
  created_at: Date;
  updated_at: Date;
  due_date: Date;
}

const initialState: Array<TodoState> = [];

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (
      state,
      action: {
        payload: TodoState;
      }
    ) => {
      // payload will be { title, desc, status, due_date }
      let newItem = {
        id: new Date().getUTCMilliseconds(),
        title: action.payload.title,
        desc: action.payload.desc,
        status: action.payload.status,
        isDone: false,
        created_at: new Date(),
        updated_at: new Date(),
        due_date: action.payload.due_date,
      };
      state.push(newItem);
    },
    editTodo: (
      state,
      action: {
        payload: TodoState;
      }
    ) => {
      // payload will be obj: { all properties of todo item }
      let index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index] = { ...action.payload, updated_at: new Date() };
      return state;
    },
    changeIsDone: (state, action: { payload: number }) => {
      // payload will be 'id'
      let index = state.findIndex((todo) => todo.id === action.payload);
      state[index].isDone = !state[index].isDone;
      return state;
    },
    changeStatus: (
      state,
      action: { payload: { id: number; status: string } }
    ) => {
      // payload will be { id, status }
      let index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].status = action.payload.status;
      return state;
    },
    deleteTodo: (state, action: { payload: number }) => {
      // payload will be 'id'
      return (state = state.filter((todo) => todo.id !== action.payload));
    },
  },
});

export const { addTodo, editTodo, changeIsDone, changeStatus, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
