import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

type ToasterType = "success" | "error" | "";
type ToasterPayload = { type: ToasterType; text: string };

type Toaster = {
  toaster: ToasterPayload;
  show: boolean;
};

const toasterState: Toaster = {
  toaster: { type: "", text: "" },
  show: false,
};

const toasterSlice = createSlice({
  name: "toaster",
  initialState: toasterState,
  reducers: {
    showToaster: function (state, action: PayloadAction<ToasterPayload>): void {
      state.toaster = action.payload;
      state.show = true;
    },
    hideToaster: function (state): void {
      state.show = false;
      state.toaster = { type: "", text: "" };
    },
  },
});

export const { showToaster, hideToaster } = toasterSlice.actions;
export default toasterSlice.reducer;
