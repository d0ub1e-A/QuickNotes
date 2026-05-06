import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setSearchedTag } from "../../features/sliceShortActions";
import { User2 } from "lucide-react";

export default function UserSectionHeader() {
  const navTo = useNavigate();
  const searchRef = useRef<HTMLFormElement>(null);
  const currentPath = useLocation().pathname;
  const { userNotes } = useAppSelector((state) => state.handleNotes);
  const userInfo = useAppSelector((state) => state.userInfo);
  const searchedTag = useAppSelector((state) => state.shortActions.searchedTag);
  const dispatch = useAppDispatch();

  const [tagArray, setTagArray] = useState<string[]>([]);
  const [showTagMenu, setShowTagMenu] = useState<boolean>(false);

  const inProfilePage = /\/me\/?$/.test(currentPath);

  useEffect(() => searchRef.current?.reset(), [currentPath]);

  // filter the tags and set it into an array
  useEffect(
    () => setTagArray(userNotes.map((notes) => notes.tag)),
    [userNotes]
  );

  // handles keydown event
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && showTagMenu) {
        setShowTagMenu(false);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [showTagMenu]);

  return (
    <div
      className={`flex relative z-60 justify-between items-center px-4 py-4 md:py-2 backdrop-blur-md header-gradient`}
    >
      {/* Logo and name section */}
      <Link to={`/me/notes`} className={`flex items-center`}>
        <img className={`w-[5rem] h-[5rem]`} src="/LogoQuickNotes.png" />
        <h1 className="text-3xl text-transparent font-bold font-[roboto] bg-gradient-to-tr from-grey-lite to-purple-lite/30 dark:brightness-150 brightness-50 bg-clip-text">
            Quick Notes
          </h1>
      </Link>

      {/* Search bar and profile section */}
      {!inProfilePage && (
        <form ref={searchRef}>
          <input
            type="text"
            name="searchTag"
            placeholder="Search By tag"
            value={searchedTag}
            onChange={(e) => dispatch(setSearchedTag(e.target.value))}
            onFocus={() => setShowTagMenu(true)}
            onBlur={() => setTimeout(() => setShowTagMenu(false), 250)}
            className={`px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 focus:border-white/60 rounded-[15px] outline-none text-white placeholder:text-white/70 transition-colors w-[20rem]`}
          />

          {/* tag menu */}
          <div
            className={`absolute w-[20rem] -bottom-[13.5rem] rounded-[15px] flex flex-col transition-all ${
              showTagMenu && tagArray.length > 0
                ? "max-h-[20rem] z-50 py-[1.2rem] tag-menu"
                : "max-h-0 z-0 border-0"
            } overflow-y-auto bg-[whitesmoke] dark:bg-grey-bold dark:text-[whitesmoke]`}
          >
            {tagArray.map((tag, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  dispatch(setSearchedTag(tag));
                  setShowTagMenu(false);
                }}
                className={`px-5 py-2 hover:bg-grey-mid hover:text-[whitesmoke] transition-all fira-mono`}
              >
                {tag}
              </button>
            ))}
          </div>
        </form>
      )}

      {/* Profile section */}
      <div className={`flex gap-5 items-center`}>
        <div className={`bg-grey-mid/50 backdrop-blur-lg p-4 rounded-[50%]`}>
          <User2 className={`text-white`} />
        </div>
        <button
          onClick={() => navTo("/me")}
          title="Go to profile"
          className={`flex items-center justify-center text-xl bg-indigo-600 rounded-xl p-3 text-stone-100 hover:brightness-125 transition-all`}
        >
          {userInfo.name}
        </button>
      </div>
    </div>
  );
}
