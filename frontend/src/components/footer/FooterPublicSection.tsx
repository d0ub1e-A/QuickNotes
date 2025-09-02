export default function PublicSectionFooter() {
  return (
    <footer className="bg-slate-700 dark:bg-gray-800 flex flex-col items-center justify-center py-8 text-gray-300 dark:text-gray-400">
      <div className="flex items-center gap-3 mb-4">
        <img src="/LogoQuickNotes.png" className="w-[3.5rem] h-[3.5rem]" />
        <span className="text-xl font-bold">QuickNotes</span>
      </div>
      <p className="text-center font-[roboto] text-sm">
        ©{new Date().getFullYear()}. d0ub1e-A. All rights reserved.
      </p>
      <p className="text-center text-xs mt-2 text-gray-400">
        Never lose your ideas again.
      </p>
    </footer>
  );
}
