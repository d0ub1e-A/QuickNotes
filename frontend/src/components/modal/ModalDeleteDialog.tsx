import { api } from "../../assets/utilities/utilApi";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setShowDeleteDialog,
  refetchNotes,
} from "../../features/sliceShortActions";

export default function DeleteDialog() {
  const { showDeleteDialog, deletableNoteId } = useAppSelector(
    (state) => state.shortActions
  );
  const dispatch = useAppDispatch();

  // functions for deleting a note
  async function deleteNote() {
    if (!deletableNoteId) return;

    try {
      const deleteRes = await api.delete(`/notes/${deletableNoteId}`);

      if (deleteRes.status === 200) {
        dispatch(refetchNotes(true));
        dispatch(setShowDeleteDialog(false));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 px-15 py-10 rounded-lg dialog-box bg-slate-100 dark:bg-slate-600 ${
        showDeleteDialog
          ? "opacity-100 -translate-y-1/2 z-40"
          : "opacity-0 translate-y-10 z-0"
      } transition-all duration-400`}
    >
      <div
        className={`flex gap-2 justify-center items-baseline text-lg sm:text-2xl font-semibold text-grey-bold`}
      >
        <span className={`warning-icon flex justify-center items-center`}>
          !
        </span>
        <p className={`mb-5 text-center dark:text-[whitesmoke]`}>
          Are you sure?
        </p>
      </div>

      {/* Buttons */}
      <div className={`flex gap-2 justify-around`}>
        <button
          onClick={() => {
            dispatch(setShowDeleteDialog(false));
          }}
          className={`text-sm sm:text-lg font-bold text-grey-bold dark:text-[whitesmoke] border-2 dark:border-grey-lite/10 border-grey-lite px-5 py-2 rounded-[12px] bg-white/5 cancel-unsave_ cancel-delete`}
        >
          Never Mind, Keep
        </button>
        <button
          onClick={deleteNote}
          className={`text-sm sm:text-lg font-bold text-white border-grey-lite px-5 py-2 rounded-[12px] bg-red-mid/90 discard-button`}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
}
