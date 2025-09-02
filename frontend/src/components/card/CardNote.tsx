import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import {
  markdownStyling,
  markDownToText,
} from "../../assets/utilities/UtilMarkdownStyling.tsx"
import { api } from "../../assets/utilities/utilApi.ts";
import { calcDateTime } from "../../assets/utilities/UtilCalcDateTime.ts";
import { getContrastYIQ } from "../../assets/utilities/utilPickRandomColor.ts";
import {
  CalendarDays,
  SquarePen,
  Trash2,
  Pin,
  SquareChartGantt,
  EllipsisVertical,
} from "lucide-react";
import type { Note } from "../../assets/utilities/utilFetchData.js";

import { useAppDispatch } from "../../hooks.ts";
import {
  setShowDeleteDialog,
  setDeletableNoteId,
  refetchNotes,
} from "../../features/sliceShortActions.ts";

type PropType = {
  note: Note;
  setToBePreviewed: Dispatch<SetStateAction<Note | null>>;
  setEditableContent: Dispatch<SetStateAction<Partial<Note> | null>>;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

export default function NoteCard({
  note,
  setToBePreviewed,
  setEditableContent,
  setShowPreview,
  setShowForm,
}: PropType) {
  const dispatch = useAppDispatch();

  const menuRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState(false);

  // handles mouse click for closing the menu in touch screen devices
  useEffect(() => {
    const closeMenu = (e: any) =>
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      setShowMenu(false);

    window.addEventListener("mousedown", closeMenu);

    return () => window.removeEventListener("mousedown", closeMenu);
  }, []);

  // opens the form for editing any existing content
  function editNote() {
    setEditableContent(note);
    setShowForm(true);
  }

  // opens the note previewer
  function previewNote() {
    setToBePreviewed(note);
    setShowPreview(true);
  }

  // pin any note no top
  async function pinNotes(id: number) {
    try {
      const pinningRes = await api.patch(`/notes/${id}/pin`);

      if(pinningRes.status === 200) dispatch(refetchNotes(true));
    } catch (error) {
      console.error(error);
    }
  }

  // function for starting of deletion
  function startDeleting() {
    dispatch(setShowDeleteDialog(true));
    dispatch(setDeletableNoteId(note.note_id));
  }

  return (
    <div
      style={{
        backgroundColor: note.note_color,
      }}
      className={`relative w-[300px] group z-10 flex flex-col gap-7 p-8 rounded-[10px] bg-amber-100/20 dark:bg-slate-700 dark:text-white transition-all duration-300 note-card`}
    >
      {/* Title + pin icon + 3 dot menu section for touch screen devices */}
      <div
        style={{
          color: getContrastYIQ(note.note_color),
        }}
        className={`relative items-center font-bold cal-sans text-3xl flex justify-between`}
      >
        <button
          onClick={() => pinNotes(note.note_id)}
          className={`hover:scale-110 text-black dark:text-white transition-all absolute -top-[45px] -left-[45px]`}
        >
          <Pin
            className={`${
              note.pinned
                ? "-rotate-45"
                : "translate-y-[20px] translate-x-[15px] group-hover:translate-y-0 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all"
            }`}
          />
        </button>
        <h2
          style={{
            boxShadow: `inset 0px -3px 5px ${getContrastYIQ(note.note_color)}`,
          }}
          className={`w-full truncate text-2xl bg-clip-text p-3 rounded-[20px]`}
        >
          {note?.title}
        </h2>

        {/* Delete button */}
        {isDesktop && (
          <button
            onClick={startDeleting}
            className={`p-1.5 ml-[1rem] rounded-full hover:border hover:border-red-300 hover:bg-slate-300/80 transition-all`}
          >
            <Trash2 size={25} />
          </button>
        )}

        {/* Menu active in mobile or tablet */}
        {(isMobile || isTablet) && (
          <div ref={menuRef}>
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className={`p-1.5 bg-slate-300 rounded-full w-fit`}
            >
              <EllipsisVertical />
            </button>

            <div
              className={`absolute ${
                showMenu
                  ? "opacity-100 border border-slate-300 max-h-40"
                  : "opacity-0 max-h-0"
              } overflow-y-hidden z-10 right-0 top-10 flex flex-col divide-y divide-slate-300 bg-amber-50 rounded-lg shadow-lg transition-all duration-200`}
            >
              <button
                onClick={previewNote}
                className={`flex gap-3 text-sm p-4 active:bg-amber-100 items-center`}
              >
                <SquareChartGantt /> Preview
              </button>
              <button
                onClick={editNote}
                className={`flex gap-3 text-sm p-4 active:bg-amber-100 items-center`}
              >
                <SquarePen size={25} /> Edit
              </button>
              <button
                onClick={startDeleting}
                className={`flex gap-3 text-sm p-4 active:bg-amber-100 items-center`}
              >
                <Trash2 /> Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Note preview with preview + edit buttons for desktop interaction handling */}
      <div
        style={{
          padding: `1rem`,
          borderRadius: `5px`,
        }} 
        className={`relative h-50 overflow-hidden blur-effect group bg-white dark:bg-slate-700 dark:text-white`}
      >
        <Markdown remarkPlugins={[remarkGfm]} components={markdownStyling}>
          {markDownToText(note.note)}
        </Markdown>

        {/* Interactive buttons for desktop only */}
        {isDesktop && (
          <div
            className={`absolute opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 inset-0 bg-gradient-to-b to-[#F8F7F7] dark:to-slate-600 from-transparent flex justify-around items-center gap-6 w-full transition-all duration-300`}
          >
            <button
              onClick={previewNote}
              className={`bg-indigo-200 text-slate-800 p-2 rounded-full active:brightness-80 flex items-center gap-2 w-27 justify-center font-semibold hover:shadow-2xl hover:-translate-y-2 transition-all h-fit`}
            >
              <SquareChartGantt />
              Preview
            </button>
            <button
              onClick={editNote}
              className={`bg-orange-400 text-slate-700 p-2 rounded-full active:brightness-80 flex items-center gap-4 w-27 justify-center font-semibold hover:shadow-2xl hover:-translate-y-2 transition-all h-fit`}
            >
              <SquarePen size={25} />
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Note tag and creation date showed in both type of devices */}
      <div className={`flex justify-between items-center`}>
        <p
          style={{
            backgroundColor: getContrastYIQ(note.note_color),
            color: note.note_color,
          }}
          className={`shadow-inner font-[500] max-w-1/3 truncate px-2.5 py-2 rounded-full fira-mono`}
        >
          {note.tag}
        </p>
        <p
          style={{
            color: getContrastYIQ(note.note_color),
          }}
          className={`fira-mono max-w-2/3 flex items-center gap-3`}
        >
          <CalendarDays size={25} />
          {calcDateTime(note?.created_at)}
        </p>
      </div>
    </div>
  );
}
