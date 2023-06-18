import { configureStore } from "@reduxjs/toolkit";
import { spinnerSlice } from "./features/spinnerSlice";

export default configureStore({
  reducer: {
    spinner: spinnerSlice.reducer,
  },
});
