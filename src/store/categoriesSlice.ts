import { createSlice } from "@reduxjs/toolkit";

declare global {
  interface TodoItemType {
    id: number;
    category: string;
    title: string;
    desc: string;
    status: string;
    isDone: boolean;
    created_at: Date;
    updated_at: Date;
    due_date: Date;
  }
  interface CategoriesType {
    id: number;
    name: string;
    items: object[];
  }
}

var categoriesFromLocalStorage = localStorage.getItem("categories");
const initialState = categoriesFromLocalStorage
  ? JSON.parse(categoriesFromLocalStorage)
  : [
      { name: "To-Do", items: [] },
      { name: "In Progress", items: [] },
      { name: "Done", items: [] },
    ];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    addCategory: (state, action: { payload: { name: string } }) => {
      state.push({ name: action.payload.name, items: [] });
    },
    editCategory: (
      state,
      action: { payload: { name: string; newName: string } }
    ) => {
      const category = state.find(
        (category: CategoriesType) => category.name === action.payload.name
      );
      category.name = action.payload.newName;
    },
    removeCategory: (state, action: { payload: { name: string } }) => {
      state.splice(
        state.findIndex(
          (category: CategoriesType) => category.name === action.payload.name
        ),
        1
      );
    },
    addItem: (
      state,
      action: { payload: { categoryName: string; item: TodoItemType } }
    ) => {
      let newItem = {
        id: new Date().getUTCMilliseconds(),
        category: action.payload.item.category,
        title: action.payload.item.title,
        desc: action.payload.item.desc,
        status: action.payload.item.status,
        isDone: false,
        created_at: new Date(),
        updated_at: new Date(),
        due_date: action.payload.item.due_date,
      };
      state
        .findIndex(
          (c: CategoriesType) => c.name === action.payload.categoryName
        )
        .items.push(newItem);
    },
    editItem: (state, action: { payload: { item: TodoItemType } }) => {
      const itemIndex = state
        .find((c: CategoriesType) => c.name === action.payload.item.category)
        .items.findIndex((i: TodoItemType) => i.id === action.payload.item.id);
      state.find(
        (c: CategoriesType) => c.name === action.payload.item.category
      ).items[itemIndex] = { ...action.payload.item, updated_at: new Date() };
    },
    changeIsDone: (
      state,
      action: { payload: { category: string; itemID: number } }
    ) => {
      state
        .find((c: CategoriesType) => c.name === action.payload.category)
        .items.find(
          (item: TodoItemType) => item.id === action.payload.itemID
        ).isDone = !state
        .find((c: CategoriesType) => c.name === action.payload.category)
        .items.find((item: TodoItemType) => item.id === action.payload.itemID)
        .isDone;
    },
    changeStatus: (
      state,
      action: { payload: { category: string; itemID: number } }
    ) => {},
    removeItem: (
      state,
      action: { payload: { categoryName: string; itemID: number } }
    ) => {
      state
        .findIndex(
          (c: CategoriesType) => c.name === action.payload.categoryName
        )
        .items.splice(
          state
            .findIndex(
              (c: CategoriesType) => c.name === action.payload.categoryName
            )
            .items.findIndex(
              (item: TodoItemType) => item.id === action.payload.itemID
            ),
          1
        );
    },
  },
});

export const {
  addCategory,
  editCategory,
  removeCategory,
  addItem,
  removeItem,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
