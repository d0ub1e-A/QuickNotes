import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  arrangeNotes,
  getPinnedNotes,
  getUntaggedNotes,
} from "../assets/utilities/utilArrangeNotes";
import { type Note } from "../assets/utilities/utilFetchData";

type CategorizedNotes = {
  userNotes: {
    tag: string;
    notes: Note[];
  }[];
  userPinnedNotes: Note[];
  untaggedNotes: Note[];
};

const categorizedNotes: CategorizedNotes = {
  userNotes: [],
  userPinnedNotes: [],
  untaggedNotes: [],
};

const noteHandlerSlice = createSlice({
  name: "all-notes",
  initialState: categorizedNotes,
  reducers: {
    arrangeUserNotes: (state, action: PayloadAction<Note[]>) => {
      state.userNotes = arrangeNotes(action.payload);
      state.userPinnedNotes = getPinnedNotes(action.payload);
      state.untaggedNotes = getUntaggedNotes(action.payload);
    },
  },
});

export const {arrangeUserNotes} = noteHandlerSlice.actions;
export default noteHandlerSlice.reducer;
