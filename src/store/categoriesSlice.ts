import { createSlice } from "@reduxjs/toolkit";

declare global {
  interface CategoriesType {
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
      action: { payload: { categoryName: string; item: object } }
    ) => {
      state
        .findIndex(
          (c: CategoriesType) => c.name === action.payload.categoryName
        )
        .items.push(action.payload.item);
    },
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
