import { createSlice } from "@reduxjs/toolkit";
import dummyData from "./dummyData";

declare global {
  interface TodoItemType {
    id: number;
    title: string;
    desc: string;
    isDone: boolean;
    created_at: string;
    updated_at: string;
    due_date: string;
  }
  interface CategoriesType {
    // id: number;
    name: string;
    items: TodoItemType[];
  }
}

var categoriesFromLocalStorage = localStorage.getItem("data");
const initialState: CategoriesType[] =
  categoriesFromLocalStorage !== null
    ? JSON.parse(categoriesFromLocalStorage)
    : [];

const categoriesSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    addCategory: (state, action: { payload: { name: string } }) => {
      state.push({ name: action.payload.name, items: [] });
      localStorage.setItem("data", JSON.stringify(state));
    },
    editCategory: (
      state,
      action: { payload: { name: string; newName: string } }
    ) => {
      const category = state.find(
        (category: CategoriesType) => category.name === action.payload.name
      );
      if (category) {
        category.name = action.payload.newName;
        localStorage.setItem("data", JSON.stringify(state));
      }
    },
    removeCategory: (state, action: { payload: { name: string } }) => {
      state.splice(
        state.findIndex(
          (category: CategoriesType) => category.name === action.payload.name
        ),
        1
      );
      localStorage.setItem("data", JSON.stringify(state));
    },
    addItem: (
      state,
      action: {
        payload: { category: string; item: TodoItemType; atIndex?: number };
      }
    ) => {
      let targetCategory = state.find(
        (c: CategoriesType) => c.name === action.payload.category
      );
      if (targetCategory !== undefined) {
        if (action.payload.atIndex !== undefined) {
          targetCategory.items.splice(
            action.payload.atIndex,
            0,
            action.payload.item
          );
        } else {
          targetCategory.items.push(action.payload.item);
        }
        localStorage.setItem("data", JSON.stringify(state));
      }
    },
    editItem: (
      state,
      action: { payload: { category: string; item: TodoItemType } }
    ) => {
      let targetCategory = state.find(
        (c: CategoriesType) => c.name === action.payload.category
      );
      if (targetCategory !== undefined) {
        const itemIndex = targetCategory.items.findIndex(
          (i: TodoItemType) => i.id === action.payload.item.id
        );
        targetCategory.items[itemIndex] = {
          ...action.payload.item,
          updated_at: new Date().toString(),
        };
        localStorage.setItem("data", JSON.stringify(state));
      }
    },
    changeIsDone: (
      state,
      action: { payload: { category: string; itemID: number } }
    ) => {
      let targetCategory = state.find(
        (c: CategoriesType) => c.name === action.payload.category
      );
      if (targetCategory !== undefined) {
        let itemIndex = targetCategory.items.findIndex(
          (item: TodoItemType) => item.id === action.payload.itemID
        );
        targetCategory.items[itemIndex].isDone =
          !targetCategory.items[itemIndex].isDone;
        localStorage.setItem("data", JSON.stringify(state));
      }
    },
    removeItem: (
      state,
      action: { payload: { categoryName: string; itemID: number } }
    ) => {
      let targetCategory = state.find(
        (c: CategoriesType) => c.name === action.payload.categoryName
      );
      if (targetCategory !== undefined) {
        targetCategory?.items.splice(
          targetCategory.items.findIndex(
            (i: TodoItemType) => i.id === action.payload.itemID
          ),
          1
        );
        localStorage.setItem("data", JSON.stringify(state));
      }
    },
    addDummyData: (state) => {
      return (state = dummyData);
    },
  },
});

export const {
  addCategory,
  editCategory,
  removeCategory,
  addItem,
  editItem,
  changeIsDone,
  removeItem,
  addDummyData,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
