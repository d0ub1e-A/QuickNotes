import type { Dispatch, SetStateAction } from "react";

type PropType = {
  showDeleteAccDialog: boolean;
  deleteAccount: VoidFunction;
  setShowDeleteAccDialog: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteAccDialog({
  showDeleteAccDialog,
  deleteAccount,
  setShowDeleteAccDialog,
}: PropType) {
  return (
    <div
      className={`fixed top-1/2 flex flex-col gap-7 left-1/2 -translate-x-1/2 p-15 rounded-lg bg-slate-100 dark:bg-slate-600 ${
        showDeleteAccDialog
          ? "opacity-100 -translate-y-1/2 z-50"
          : "opacity-0 translate-y-10 -z-10"
      } transition-all dialog-box`}
    >
      <div
        className={`flex gap-2 items-baseline text-lg sm:text-2xl font-semibold text-grey-bold`}
      >
        <span className={`warning-icon flex justify-center p-5 items-center`}>
          !
        </span>
        <p className={`text-center dark:text-[whitesmoke]`}>Are You Sure?</p>
      </div>

      <p
        className={`text-grey-mid text-center text-[1.15rem] dark:text-grey-lite`}
      >
        You will lose all your notes and personal data. Do you still want to
        delete
      </p>

      {/* Buttons */}
      <div className={`flex gap-2 justify-around`}>
        <button
          onClick={() => {
            setShowDeleteAccDialog(false);
          }}
          className={`text-sm sm:text-lg font-bold text-grey-bold dark:text-grey-bold border-2 dark:border-grey-lite/10 border-grey-lite dark:bg-grey-lite px-5 py-2 rounded-[12px] bg-white/5 cancel-unsave`}
        >
          No, Cancel
        </button>
        <button
          onClick={deleteAccount}
          className={`text-sm sm:text-lg font-bold text-white border-grey-lite px-5 py-2 rounded-[12px] bg-red-mid/90 discard-button`}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
}
