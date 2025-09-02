import { type Note } from "./utilFetchData";

export function arrangeNotes(notes: Note[]): { tag: string; notes: Note[] }[] {
  const tags = [...new Set(notes.map((note) => note.tag))];
  const categorizedNotes = tags.map((tag) => ({
    tag: tag,
    notes: notes.filter((note) => note.tag === tag && !note.pinned),
  }));
  const allTaggedNotes = categorizedNotes.filter(
    (category) => category.tag !== "untagged"
  );

  return allTaggedNotes;
}

export function getPinnedNotes(notes: Note[]): Note[] {
  return notes.filter((note) => note.pinned);
}

export function getUntaggedNotes(notes: Note[]): Note[] {
  return notes.filter((note) => note.tag === "untagged");
}
