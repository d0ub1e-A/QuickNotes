import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToTop, stopScroll } from "../../features/sliceScrollTop";
import { useAppDispatch } from "../../hooks";

export default function PublicSectionHeader() {
  const pathName: string = useLocation().pathname;
  const navTo = useNavigate();
  const dispatch = useAppDispatch();

  const isInLoginPage = (): boolean => /\/login\/?/.test(pathName);

  function navOrScroll(): void {
    isInLoginPage() ? navTo("/") : handleScroll();
  }

  function handleScroll(): void {
    dispatch(scrollToTop());
    setTimeout(() => dispatch(stopScroll()), 100);
  }

  return (
    <div
      className={`flex justify-between items-center px-4 md:px-8 py-2 bg-gradient-to-r from-purple-mid/30 to-purple-600`}
    >
      {/* Logo and name section */}
      <button onClick={navOrScroll}>
        <div className={`flex items-center`}>
          <img className={`w-[5rem] h-[5rem]`} src="/LogoQuickNotes.png" />
          <h1 className="text-3xl text-transparent font-bold font-[roboto] bg-gradient-to-tr from-grey-bold to-purple-lite bg-clip-text">
            Quick Notes
          </h1>
        </div>
      </button>

      {/* Navigation bar */}
      {!isInLoginPage() ? (
        <nav className={`flex justify-end font-[roboto] text-[#e8f1f1]`}>
          <Link to={`/login`} className="hover:text-indigo-200">
            Login/Register
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
