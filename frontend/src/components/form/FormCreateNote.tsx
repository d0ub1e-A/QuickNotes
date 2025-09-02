import "react-color-palette/css";

import {
  useRef,
  useState,
  useEffect,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { api } from "../../assets/utilities/utilApi";
import {
  BadgeInfo,
  NotebookPen,
  NotebookText,
  Palette,
  RectangleHorizontal,
  Tag,
  X,
} from "lucide-react";
import { ColorPicker, useColor } from "react-color-palette";
import { getContrastYIQ } from "../../assets/utilities/utilPickRandomColor";
import { type Note } from "../../assets/utilities/utilFetchData";
import { useAppDispatch } from "../../hooks";
import { refetchNotes } from "../../features/sliceShortActions";

type PropType = {
  showForm: boolean;
  setShowUnsaveDialog: Dispatch<SetStateAction<boolean>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  editableContent: Partial<Note> | null;
  allAvailableTags: string[];
};

type CreatedNote = {
  title: string;
  note: string;
  tag: string;
};

export default function CreateNoteForm({
  showForm,
  setShowUnsaveDialog,
  setShowForm,
  editableContent,
  allAvailableTags,
}: PropType) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();

  const [noteColor, setNoteColor] = useColor(`#363896`);

  const [noteTag, setNoteTag] = useState("");
  const [warning, setWarning] = useState("");
  const [invalidTag, setInvalidTag] = useState(false);
  const [bounceTitleBar, setBounceTitleBar] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);

  const inEditMode =
    editableContent && Object.keys(editableContent).length !== 0;
  const invalidTags = [
    /(?:\s+|^)unt[a@][g&][g&]?[e3]?d?(?:\s+[A-Z]?[0-9]?|$)/i,
  ];

  const textarea = document.getElementById("note");

  if (textarea) {
    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }

  useEffect(() => {
    if (editableContent) {
      setNoteTag(editableContent.tag || "");
      setNoteColor((prev) => ({
        ...prev,
        hex: editableContent.note_color || `#363896`,
      }));
    }
  }, [editableContent]);

  // Handles default job after opening or closing the not taking form
  useEffect(() => {
    if (!showForm) return;

    titleRef.current?.focus();
    formRef.current?.reset();
    setWarning("");
    setInvalidTag(false);
    setShowColorPalette(false);
  }, [showForm]);

  // Prevents users from setting tag as 'untagged'
  useEffect(() => {
    if (!inEditMode)
      setInvalidTag(invalidTags.some((pattern) => pattern.test(noteTag)));
  }, [noteTag]);

  // handles keydown event
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) =>
      event.key === "Escape" && showForm && closeNoteForm();

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [showForm, noteTag]);

  // Handles both creation of new note and updating existing note
  async function sendNoteData(
    noteData: Partial<CreatedNote>,
    e: FormEvent<HTMLFormElement>
  ) {
    const fullNoteData = {
      ...noteData,
      note_color: noteColor.hex,
    };

    try {
      const res = inEditMode
        ? await api.patch(`/notes/${editableContent.note_id}`, fullNoteData)
        : await api.post(`/notes/`, fullNoteData);

      const status = res.status;

      if (status === 200 || status === 201) {
        e.currentTarget?.reset();
        setShowColorPalette(false);
        setShowForm(false);
        dispatch(refetchNotes(true));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Thorough check on submitted data
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const noteData = Object.fromEntries(formData);

    if (noteData.title && !invalidTag) sendNoteData(noteData, e);
    else {
      setWarning("Provide a title to save the note...");
      setBounceTitleBar(true);
      setTimeout(() => setBounceTitleBar(false), 301);
    }
  }

  // Check whether user want to close the form with unsaved data
  function closeNoteForm() {
    const formData = new FormData(formRef.current!);
    const { title, note, tag } = Object.fromEntries(formData);

    if (note !== "" || tag !== "" || title !== "") setShowUnsaveDialog(true);
    else if (!note && !tag && !title) {
      setShowColorPalette(false);
      setShowForm(false);
    }
  }

  return (
    <div
      className={`fixed top-[6.3rem] left-1/2 -translate-x-1/2 ${
        showForm ? "z-40" : "z-0"
      }`}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`bg-white dark:bg-grey-bold relative border border-slate-300 shadow-md flex flex-col p-[2.5rem] rounded-[20px] gap-2 md:gap-3 max-h-[80svh] transition-all overflow-y-scroll ${
          showForm ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
        }`}
      >
        {/* form closing button for touch screen device */}
        {(isMobile || isTablet) && (
          <button
            type="button"
            onClick={closeNoteForm}
            className={`bg-slate-300 hover:bg-slate-400/60 hover:shadow-xl font-normal md:font-semibold sticky top-0 left-full w-10 md:w-12 h-10 md:h-12 md:p-2 rounded-full text-sm md:text-lg z-30`}
          >
            <X />
          </button>
        )}

        {/* Note title input area */}
        <>
          <label
            htmlFor="title"
            className={`flex items-center gap-2 font-[700] cal-sans text-lg dark:text-white`}
          >
            <RectangleHorizontal />
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder={warning || "Set your title here"}
            ref={titleRef}
            defaultValue={editableContent?.title || ""}
            className={`input-style ${warning && "no-title"} ${
              bounceTitleBar && "animate-bounce"
            } farro dark:bg-grey-lite`}
          />
        </>

        {/* Note text input area */}
        <>
          <label
            htmlFor="note"
            className={`text-lg font-[700] cal-sans dark:text-white inline-flex gap-2`}
          >
            <NotebookPen />
            Note
          </label>
          <textarea
            name="note"
            id="note"
            placeholder={`Start writing your note...

You can use markdown formatting:
• **bold text**
• *italic text*
• # Headings
• - Lists
• [links](url)
• \`code\``}
            defaultValue={editableContent?.note || ""}
            style={{
              backgroundColor: noteColor.hex,
              color: getContrastYIQ(noteColor.hex),
            }}
            className={`min-h-[30svh] max-h-[40svh] min-w-[85svw] md:min-w-[35svw] noteTextArea dark:bg-grey-lite resize-y input-style`}
          ></textarea>
          <p
            className={`flex items-center gap-1 w-fit text-grey-bold text-[14px] dark:text-[whitesmoke]`}
          >
            <BadgeInfo size={15} />
            Supports Markdown formatting
          </p>
        </>

        {/* Note tag input area + color picker */}
        <div className={`relative`}>
          <div className={`flex justify-between items-center`}>
            <label
              className={`flex gap-2 items-center text-lg font-[700] cal-sans dark:text-white mb-2`}
            >
              <Tag size={20} />
              Tag
            </label>
            <label
              className={`p-2.5 text-lg font-[700] cal-sans text-transparent bg-clip-text mb-2 flex gap-2`}
            >
              <Palette style={{ color: noteColor.hex }} />
              <p
                style={{ backgroundColor: noteColor.hex }}
                className={`bg-clip-text`}
              >
                Choose an accent color
              </p>
            </label>
          </div>

          {/* input box + color picker show/hide button */}
          <div className={`relative`}>
            <input
              name="tag"
              id="tag"
              onFocus={() => setShowTagMenu(true)}
              onBlur={() => setTimeout(() => setShowTagMenu(false), 250)}
              placeholder="Add a tag to categorize easily e.g. project, ideas etc..."
              onChange={(e) => setNoteTag(e.target.value)}
              value={noteTag}
              className={`dark:bg-grey-lite border w-full input-style farro`}
            />
            <button
              type="button"
              onClick={() => setShowColorPalette((prev) => !prev)}
              style={{
                backgroundColor: noteColor.hex,
              }}
              className={`absolute z-40 top-1/2 -translate-y-1/2 -translate-x-[2rem] w-[1.4rem] h-[1.4rem] inline-block rounded-full color-palette-button hover:scale-110 transition-all`}
            ></button>
          </div>

          {/* color picker */}
          <div
            className={`absolute h-[5rem] right-0 -top-[30rem] ${
              showColorPalette
                ? "-translate-x-0 opacity-100 z-50"
                : "translate-x-10 opacity-0 -z-10"
            } transition-all color-picker`}
          >
            <ColorPicker color={noteColor} onChange={setNoteColor} />
          </div>
          <p
            className={`text-red-400 ${
              invalidTag
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            } cal-sans text-right transition-all duration-200`}
          >
            You can not use this tag...
          </p>
        </div>

        {/* Create/update + cancel button */}
        <div className="flex justify-end gap-3">
          {isDesktop && (
            <button
              type="button"
              onClick={closeNoteForm}
              className={`border-grey-lite border text-grey-mid dark:text-grey-lite cal-sans flex items-center gap-1 rounded-xl p-1.5 text-lg font-semibold sm:hover:scale-105 transition-all duration-300 shadow-md`}
            >
              <X />
              Cancel
            </button>
          )}
          <button
            className={`cal-sans inline-flex gap-2 createButton rounded-xl p-1.5 text-lg  font-semibold sm:hover:scale-105 transition-all duration-300 shadow-md`}
          >
            <NotebookText />
            {inEditMode ? "Update Note" : "Create Note"}
          </button>
        </div>
      </form>
      {/* Tag menu */}
      <div
        className={`absolute w-1/2 -bottom-[1.8rem] left-[2.5rem] rounded-2xl flex flex-col transition-all ${
          showTagMenu && allAvailableTags.length > 0
            ? "max-h-36 z-50 py-[1.2rem] tag-menu"
            : "max-h-0 z-0 border-0"
        } overflow-y-auto bg-[whitesmoke] dark:bg-grey-bold dark:text-[whitesmoke]`}
      >
        {allAvailableTags.map((tag, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setNoteTag(tag)}
            className={`px-5 py-2 hover:bg-grey-mid hover:text-[whitesmoke] transition-all fira-mono`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
