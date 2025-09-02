import "./index.css";

import { Fragment } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Toaster from "./components/modal/ModalToaster";
import PublicLayout from "./layout/LayoutPublic";
import UserLayout from "./layout/LayoutUser";
import HomePage from "./page/PageHome";
import LoginPage from "./page/PageLogin";
import NotePage from "./page/PageNote";
import UserProfilePage from "./page/PageUserProfile";

const queryClient = new QueryClient();

export default function App() {
  const allRoutes = createBrowserRouter([
    {
      path: `/`,
      element: <PublicLayout />,
      children: [
        {
          path: ``,
          element: <HomePage />,
        },
        {
          path: `login`,
          element: <LoginPage />,
        },
      ],
    },
    {
      path: `/me`,
      element: <UserLayout />,
      children: [
        {
          path: ``,
          element: <UserProfilePage />,
        },
        {
          path: `notes`,
          element: <NotePage />,
        },
      ],
    },
  ]);

  return (
    <Fragment>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={allRoutes} />
      </QueryClientProvider>
    </Fragment>
  );
}
