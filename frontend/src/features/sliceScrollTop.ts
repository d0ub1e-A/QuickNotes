import { createSlice } from "@reduxjs/toolkit";

type ScrollState = {
  toTop: boolean;
};

const scroll: ScrollState = {
  toTop: false,
};

const scrollTopSlice = createSlice({
  name: "scroll-home",
  initialState: scroll,
  reducers: {
    scrollToTop: function (state): void {
      state.toTop = true;
    },
    stopScroll: function (state): void {
      state.toTop = false;
    },
  },
});

export const {scrollToTop, stopScroll} = scrollTopSlice.actions;
export default scrollTopSlice.reducer;
