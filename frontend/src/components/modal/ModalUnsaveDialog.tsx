export default function UnsaveDialog({ showUnsaveDialog, setShowUnsaveDialog, setShowForm }) {
  function discard() {
    setShowUnsaveDialog(false);
    setShowForm(false);
  }

  return (
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 px-15 py-10 rounded-lg bg-slate-100 dark:bg-slate-600 ${showUnsaveDialog ? 'opacity-100 -translate-y-1/2 z-50' : 'opacity-0 translate-y-10 z-0'} transition-all duration-400 dialog-box`}>
      
      <div className={`flex gap-2 items-baseline text-lg sm:text-2xl font-semibold text-grey-bold`}>
        <span className={`warning-icon flex justify-center items-center`}>!</span>
        <p className={`mb-5 text-center dark:text-[whitesmoke]`}>Discard Unsaved Changes?</p>
      </div>

      {/* Buttons */}
      <div className={`flex gap-2 justify-around`}>
        <button
          onClick={() => setShowUnsaveDialog(false)}
          className={`text-sm sm:text-lg font-bold text-grey-bold dark:text-[whitesmoke] border-2 dark:border-grey-lite/10 border-grey-lite px-5 py-2 rounded-[12px] bg-white/5 cancel-unsave`}
        >Cancel
        </button>
        <button
          onClick={discard}
          className={`text-sm sm:text-lg font-bold text-white border-grey-lite px-5 py-2 rounded-[12px] bg-red-mid/90 discard-button`}
        >Discard
        </button>
      </div>
    </div>
  );
}