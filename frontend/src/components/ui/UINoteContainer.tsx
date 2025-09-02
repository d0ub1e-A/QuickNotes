import type { Dispatch, SetStateAction } from "react";
import type { Note } from "../../assets/utilities/utilFetchData";
import { pickAColor } from "../../assets/utilities/UtilPickRandomColor";

import NoteCard from "../card/CardNote";

type PropType = {
  groupedNotes: {
    tag: string;
    notes: Note[];
  };
  setToBePreviewed: Dispatch<SetStateAction<Note | null>>;
  setEditableContent: Dispatch<SetStateAction<Partial<Note> | null>>;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

export default function NoteContainerUI({
  groupedNotes,
  setToBePreviewed,
  setEditableContent,
  setShowPreview,
  setShowForm,
}: PropType) {
  const thisTag = groupedNotes?.tag;
  const thisNotes = groupedNotes?.notes;
  const randomColor = pickAColor();

  return (
    <section className={`relative px-10 pt-10`}>
      <p
        className={`${
          thisTag === "untagged" ? "bg-red-200" : randomColor
        } sticky top-3 z-20 max-w-fit truncate px-2.5 py-2 rounded-full font-[500] fira-mono mb-10`}
      >
        {thisTag}
      </p>
      <div className={`w-full flex flex-wrap justify-start gap-10`}>
        {thisNotes?.map((note, index) => (
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
