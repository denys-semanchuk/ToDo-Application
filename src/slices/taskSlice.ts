import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortType, Task } from "../types";
import { FilterType } from "../types";

const STORAGE_KEY = "tasks";

const loadTasks = (): Task[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};
const initialState: { tasks: Task[]; filter: FilterType; sort: SortType } = {
  tasks: loadTasks(),
  filter: FilterType.ALL,
  sort: SortType.ASC,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: state.tasks.length,
        text: action.payload,
        completed: false,
        timestamp: new Date().getTime(),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },

    setSortingByTime: (state) => {
      if (state.sort === SortType.ASC) {
        state.sort = SortType.DESC;
      } else {
        state.sort = SortType.ASC;
      }
      state.tasks = state.tasks.sort((a, b) =>
        state.sort === SortType.ASC ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
      );
    },

    updateTask: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (!task) return;
      task.text = action.payload.text;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },
  },
});
export const {
  addTask,
  removeTask,
  toggleTask,
  setFilter,
  updateTask,
  setSortingByTime,
  reorderTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
