import { configureStore } from "@reduxjs/toolkit";
import toasterReducer from "./features/sliceToaster";
import scrollReducer from "./features/sliceScrollTop";
import userReducer from "./features/sliceUserData";
import notesReducer from "./features/sliceNoteHandler";
import shortActionsReducer from "./features/sliceShortActions";

export const store = configureStore({
  reducer: {
    toaster: toasterReducer,
    homeScroller: scrollReducer,
    userInfo: userReducer,
    handleNotes: notesReducer,
    shortActions: shortActionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
