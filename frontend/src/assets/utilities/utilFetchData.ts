import { api } from "./utilApi";
import z from "zod";

const userSchema = z.object({
  email: z.string(),
  name: z.string(),
});

const noteSchema = z.object({
  created_at: z.string(),
  note: z.string(),
  note_color: z.string(),
  note_id: z.number(),
  pinned: z.boolean(),
  tag: z.string(),
  title: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Note = z.infer<typeof noteSchema>;

export async function fetchUser(): Promise<User> {
  try {
    const res = await api.get<User>("/user");
    const userData = userSchema.safeParse(res.data);

    if (!userData.success) {
      throw new Error("Failed to parse user data.");
    }

    return userData.data;
  } catch (error) {
    throw new Error("User data fetch failed");
  }
}

export async function fetchNotes(): Promise<Note[]> {
  try {
    const res = await api.get<Note[]>("/notes");
    const notesData = noteSchema.array().safeParse(res.data);

    if (!notesData.success) {
      throw new Error("Failed to parse notes data.");
    }

    return notesData.data;
  } catch (error) {
    throw new Error("Failed to fetch the notes.");
  }
}
