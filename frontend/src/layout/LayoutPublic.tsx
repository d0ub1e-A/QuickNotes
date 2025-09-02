import { Outlet, useLocation } from "react-router-dom";

import PublicSectionHeader from "../components/header/HeaderPublicSection";

type BG = Record<string, string>;

export default function PublicLayout() {
  const pathName: string = useLocation().pathname;

  const bgStyle: BG = {
    "/login": "dark:bg-slate-800",
  };

  return (
    <div className={`fixed w-screen h-screen grid grid-cols-12 grid-rows-12`}>
        <header className={`col-span-12 row-start-0 row-end-1`}>
          <PublicSectionHeader />
        </header>

        <main
          className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll ${bgStyle[pathName]}`}
        >
          <Outlet />
        </main>
    </div>
  );
}
