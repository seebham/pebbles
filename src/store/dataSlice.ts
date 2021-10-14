import { createSlice } from "@reduxjs/toolkit";

declare global {
  interface TodoItemType {
    id: number;
    category: string;
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
    : [
        {
          name: "To-Do",
          items: [
            {
              id: 1234,
              category: "To-Do",
              title: "Task1",
              desc: "New Task",
              isDone: false,
              created_at: new Date().toString(),
              updated_at: new Date().toString(),
              due_date: new Date(2022, 1, 1).toString(),
            },
            {
              id: new Date().valueOf(),
              category: "To-Do",
              title: "Task2",
              desc: "New Task hai yeh",
              isDone: false,
              created_at: new Date().toString(),
              updated_at: new Date().toString(),
              due_date: new Date(2023, 1, 1).toString(),
            },
          ],
        },
        {
          name: "In Progress",
          items: [
            {
              id: new Date().valueOf(),
              category: "In Progress",
              title: "Task1",
              desc: "New Task",
              isDone: false,
              created_at: new Date().toString(),
              updated_at: new Date().toString(),
              due_date: new Date(2023, 1, 1).toString(),
            },
            {
              id: new Date().valueOf(),
              category: "In Progress",
              title: "Task2",
              desc: "New Task",
              isDone: false,
              created_at: new Date().toString(),
              updated_at: new Date().toString(),
              due_date: new Date(2022, 1, 1).toString(),
            },
          ],
        },
        {
          name: "Done",
          items: [
            {
              id: new Date().valueOf(),
              category: "Done",
              title: "Task1",
              desc: "New Task",
              isDone: false,
              created_at: new Date().toString(),
              updated_at: new Date().toString(),
              due_date: new Date(2022, 1, 1).toString(),
            },
            {
              id: new Date().valueOf(),
              category: "Done",
              title: "Task2",
              desc: "New Task",
              isDone: false,
              created_at: new Date().toString(),
              updated_at: new Date().toString(),
              due_date: new Date(2024, 1, 1).toString(),
            },
          ],
        },
      ];

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
    addItem: (state, action: { payload: { item: TodoItemType } }) => {
      let targetCategory = state.find(
        (c: CategoriesType) => c.name === action.payload.item.category
      );
      if (targetCategory !== undefined) {
        targetCategory.items.push(action.payload.item);
        localStorage.setItem("data", JSON.stringify(state));
      }
    },
    editItem: (state, action: { payload: { item: TodoItemType } }) => {
      let targetCategory = state.find(
        (c: CategoriesType) => c.name === action.payload.item.category
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
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
