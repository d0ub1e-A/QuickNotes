import type { Dispatch, SetStateAction } from "react";
import type { Note } from "../../assets/utilities/utilFetchData";
import NoteCard from "../card/CardNote";

type PropType = {
  pinnedNotes: Note[];
  setToBePreviewed: Dispatch<SetStateAction<Note | null>>;
  setEditableContent: Dispatch<SetStateAction<Partial<Note> | null>>;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

export default function PinnedNoteContainerUI({
  pinnedNotes,
  setToBePreviewed,
  setEditableContent,
  setShowPreview,
  setShowForm,
}: PropType) {
  return (
    <section className={`relative px-10 pt-10`}>
      <div className={`w-full flex flex-wrap justify-start gap-10`}>
        {pinnedNotes?.map((note, index) => (
          <NoteCard
            key={index}
            note={note}
            setToBePreviewed={setToBePreviewed}
            setEditableContent={setEditableContent}
            setShowPreview={setShowPreview}
            setShowForm={setShowForm}
          />
        ))}
      </div>
    </section>
  );
}
