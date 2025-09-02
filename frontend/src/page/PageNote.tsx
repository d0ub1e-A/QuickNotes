import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { type Note } from "../assets/utilities/utilFetchData";

import { useAppSelector } from "../hooks";

import CreateNoteForm from "../components/form/FormCreateNote";
import UnsaveDialog from "../components/modal/ModalUnsaveDialog";
import NotePreviewer from "../components/misc/NotePreviewer";
import NoteContainerUI from "../components/ui/UINoteContainer";
import PinnedNoteContainerUI from "../components/ui/UIPinnedNoteContainer";
import DeleteDialog from "../components/modal/ModalDeleteDialog";
import UntaggedNoteContainerUI from "../components/ui/UIUntaggedNoteContainer";

export default function NotePage() {
  const { searchedTag } = useAppSelector(
    (state) => state.shortActions
  );
  const { userNotes, userPinnedNotes, untaggedNotes } = useAppSelector(
    (state) => state.handleNotes
  );

  const [showForm, setShowForm] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showUnsaveDialog, setShowUnsaveDialog] = useState<boolean>(false);
  const [editableContent, setEditableContent] = useState<Partial<Note> | null>(
    null
  );
  const [toBePreviewed, setToBePreviewed] = useState<Note | null>(null);
  const [showNotFound, setShowNotFound] = useState<boolean>(false);
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [renderedNotes, setRenderedNotes] = useState<
    { tag: string; notes: Note[] }[]
  >([]);

  // handles when to show the modal backdrop
  useEffect(() => {
    setShowBackdrop(showForm || showPreview || false);
  }, [showForm, showPreview]);

  // Handles keydown event for closing previewer
  useEffect(() => {
    const closePreview = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showPreview && !showUnsaveDialog) {
        setShowPreview(false);
      }
    };

    window.addEventListener("keydown", closePreview);

    return () => window.removeEventListener("keydown", closePreview);
  }, [showPreview, showUnsaveDialog]);

  // Set the fetched notes in the renderedNotes variable to show
  useEffect(() => {
    setRenderedNotes(userNotes);
  }, [userNotes]);

  // Controls the real time search
  useEffect(() => {
    setShowNotFound(false);

    if (searchedTag === "") {
      setRenderedNotes(userNotes);
    } else {
      const toBeRendered = userNotes.filter((note) =>
        note.tag.toLowerCase().includes(searchedTag.toLowerCase())
      );

      toBeRendered.length
        ? setRenderedNotes(toBeRendered)
        : setShowNotFound(true);
    }
  }, [searchedTag, userNotes]);

  function createNewNote() {
    setEditableContent({});
    setShowForm(true);
  }

  // Close the backdrop according to the associated modals
  function closeBackdrop() {
    if (showForm) {
      setShowForm(false);
    }
    if (showPreview) {
      setShowPreview(false);
    } else {
      setShowBackdrop(false);
    }
  }

  return (
    <div className={`py-10`}>
      {/* common backdrop for form and previewer */}
      <div
        onClick={closeBackdrop}
        className={`fixed z-30 top-[6rem] bg-black/10 w-full h-full backdrop-blur-sm overflow-y-scroll ${
          showBackdrop ? "" : "hidden"
        }`}
      ></div>
      {/* Create or edit note form */}

      <CreateNoteForm
        showForm={showForm}
        setShowForm={setShowForm}
        setShowUnsaveDialog={setShowUnsaveDialog}
        editableContent={editableContent}
        allAvailableTags={userNotes.map((note) => note.tag)}
      />

      {/* Note previewer */}
      <NotePreviewer toBePreviewed={toBePreviewed} showPreview={showPreview} />

      {/* Dialog box for confirmation of discarding unsaved changes */}
      <UnsaveDialog
        showUnsaveDialog={showUnsaveDialog}
        setShowUnsaveDialog={setShowUnsaveDialog}
        setShowForm={setShowForm}
      />

      {/* dialog for confirmation of deleting a note */}
      <DeleteDialog />

      {/* Notes Container */}
      {showNotFound ? (
        <h1
          className={`dark:text-slate-100 fira-mono text-center mt-[40svh] text-xl md:text-3xl lg:text-4xl`}
        >
          Nothing Matched Your Search
        </h1>
      ) : (
        <>
          {userPinnedNotes.length !== 0 && searchedTag === "" && (
            <PinnedNoteContainerUI
              pinnedNotes={userPinnedNotes}
              setToBePreviewed={setToBePreviewed}
              setEditableContent={setEditableContent}
              setShowPreview={setShowPreview}
              setShowForm={setShowForm}
            />
          )}
          {renderedNotes?.map((note, index) => (
            <NoteContainerUI
              key={index}
              groupedNotes={note}
              setToBePreviewed={setToBePreviewed}
              setEditableContent={setEditableContent}
              setShowPreview={setShowPreview}
              setShowForm={setShowForm}
            />
          ))}
          {searchedTag !== "" && (
            <PinnedNoteContainerUI
              pinnedNotes={userPinnedNotes}
              setToBePreviewed={setToBePreviewed}
              setEditableContent={setEditableContent}
              setShowPreview={setShowPreview}
              setShowForm={setShowForm}
            />
          )}
          {untaggedNotes.length !== 0 && searchedTag === "" && (
            <UntaggedNoteContainerUI
              untaggedNotes={untaggedNotes}
              setToBePreviewed={setToBePreviewed}
              setEditableContent={setEditableContent}
              setShowPreview={setShowPreview}
              setShowForm={setShowForm}
            />
          )}
        </>
      )}

      {/* Add Note button */}
      <button
        onClick={createNewNote}
        title="Create Note"
        className={`fixed ${
          showForm ? "z-0 scale-0" : "z-10 scale-100"
        } transition-all duration-400 top-[85svh] right-[10svw] shadow-2xl border border-slate-400 active:bg-white text-2xl p-2 md:p-3 rounded-xl bg-[#bbbdfb]/25 dark:bg-slate-100 backdrop-blur-xs`}
      >
        <Plus size={25} />
      </button>
    </div>
  );
}
