import { useDispatch, useSelector } from "react-redux";
import { type TypedUseSelectorHook } from "react-redux";
// import type { RootState, AppDispatch } from "./store";
import type { RootState, AppDispatch/* , UserState, UserDispatch */ } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useUserDispatch: () => UserDispatch = useDispatch;
// export const useUserSelector: TypedUseSelectorHook<UserState> = useSelector;
