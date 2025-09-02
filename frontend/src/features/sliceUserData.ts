import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../assets/utilities/utilFetchData";

const userInfo: User = {
  email: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInfo,
  reducers: {
    setUserInfo: function (state, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const {setUserInfo} = userSlice.actions;
export default userSlice.reducer;
