import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, fetchUser } from "../assets/utilities/utilFetchData";
import type { AxiosError } from "axios";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setUserInfo } from "../features/sliceUserData";
import { arrangeUserNotes } from "../features/sliceNoteHandler";
import { handleError } from "../features/sliceErrorHandle";
import {
  refetchUser,
  refetchNotes,
  setSearchedTag,
} from "../features/sliceShortActions";

import UserSectionHeader from "../components/header/HeaderUserSection";

export default function UserLayout() {
  const pathName = useLocation().pathname;
  const dispatch = useAppDispatch();
  const navTo = useNavigate();

  const { getNotes, getUser } = useAppSelector((state) => state.shortActions);

  const bgStyle: Record<string, string> = {
    "/me/notes": "bg-indigo-50 dark:bg-slate-800",
    "/me/notes/": "bg-indigo-50 dark:bg-slate-800",
    "/me": "bg-[hsl(264,0%,100%)] dark:bg-[hsl(264,0%,10%)]",
    "/me/": "bg-slate-50 dark:bg-slate-800",
  };

  const message: Record<number, string> = {
    400: "Bad request try again.",
    401: "Log into your account to access your notes.",
    500: "Internal server error. Please try again.",
    404: "What you are looking for doesn't exist",
    0: "Unexpected error occurred.",
  };

  // Fetch user data
  const {
    data: userData,
    isError: isUserError,
    error: userError,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  // handles user fetching error
  if (isUserError) {
    showError(userError as AxiosError);
  }

  // Update Redux store when user data changes
  useEffect(() => {
    if (userData) {
      dispatch(setUserInfo(userData));
    }
  }, [userData, dispatch]);

  // Fetch notes only after user data is available
  const {
    data: notesData,
    isError: isNotesError,
    error: notesError,
    refetch: refetchNotesData,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    retry: 1,
    staleTime: 1000 * 60,
  });

  // handles the fetching error of notes
  if (isNotesError) {
    showError(notesError as AxiosError);
  }

  // Updates notes data in redux store
  useEffect(() => {
    if (notesData) {
      dispatch(arrangeUserNotes(notesData));
    }
  }, [notesData, dispatch]);

  // user refetching trigger
  useEffect(() => {
    if (getUser) {
      refetchUserData();
      dispatch(refetchUser(false));
    }
  }, [getUser, refetchUserData]);

  // note refetching trigger
  useEffect(() => {
    if (getNotes && userData) {
      refetchNotesData();
      dispatch(refetchNotes(false));
    }
  }, [getNotes, userData, refetchNotesData]);

  // shows error for both user and notes
  function showError(error: AxiosError): void {
    const errorCode: number = error.status || 0;

    if (errorCode === 401) {
      handleError({ status: errorCode, messages: message }, dispatch);
      navTo("/login");
    } else {
      handleError({ status: errorCode, messages: message }, dispatch);
    }
  }

  // resets the search box after location change
  useEffect(() => {
    dispatch(setSearchedTag(""));
  }, [pathName, dispatch]);

  return (
    <div className={`fixed h-screen w-screen grid grid-cols-12 grid-rows-12`}>
      <header className={`col-span-12 row-start-0 row-end-1 user-header`}>
        <UserSectionHeader />
      </header>

      <main
        className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll ${bgStyle[pathName]}`}
      >
        <Outlet />
      </main>
    </div>
  );
}
