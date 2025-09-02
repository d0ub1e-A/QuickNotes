import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ShortActionsType = {
  getUser: boolean;
  getNotes: boolean;
  searchedTag: string;
  showDeleteDialog: boolean;
  deletableNoteId: number | null;
};

const shortActionState: ShortActionsType = {
  getUser: true,
  getNotes: true,
  searchedTag: "",
  showDeleteDialog: false,
  deletableNoteId: null,
};

const shortActionsSlice = createSlice({
  name: "short-actions",
  initialState: shortActionState,
  reducers: {
    refetchUser: (state, action: PayloadAction<boolean>) => {
      state.getUser = action.payload;
    },
    refetchNotes: (state, action: PayloadAction<boolean>) => {
      state.getNotes = action.payload;
    },
    setSearchedTag: (state, action: PayloadAction<string | "">) => {
      state.searchedTag = action.payload;
    },
    setShowDeleteDialog: (state, action: PayloadAction<boolean>) => {
      state.showDeleteDialog = action.payload;
    },
    setDeletableNoteId: (state, action: PayloadAction<number>) => {
      state.deletableNoteId = action.payload;
    },
  },
});

export const {
  refetchUser,
  refetchNotes,
  setSearchedTag,
  setShowDeleteDialog,
  setDeletableNoteId,
} = shortActionsSlice.actions;
export default shortActionsSlice.reducer;
