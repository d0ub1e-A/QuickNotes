import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import {
  markdownStyling,
  markDownToText,
} from "../../assets/utilities/UtilMarkdownStyling.tsx";
import { pickAColor } from "../../assets/utilities/UtilPickRandomColor.ts";
import { calcDateTime } from "../../assets/utilities/UtilCalcDateTime.ts";
import type { Note } from "../../assets/utilities/utilFetchData.js";

type PropType = {
  toBePreviewed: Note | null;
  showPreview: boolean;
};

export default function NotePreviewer({
  toBePreviewed,
  showPreview,
}: PropType) {
  const randomColor = pickAColor();

  if (!toBePreviewed) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: toBePreviewed.note_color,
      }}
      className={`fixed grid grid-cols-12 grid-rows-12 w-[90svw] lg:w-[80svw] xl:w-[60svw] h-[80svh] top-1/2 left-1/2 -translate-x-1/2 px-7 py-6 overflow-y-scroll rounded-[20px] bg-white text-slate-800 dark:bg-slate-700 ${
        showPreview
          ? "-translate-y-[23rem] z-40 opacity-100"
          : "opacity-0 -translate-y-10 z-0"
      } transition-all duration-300`}
    >
      <h1
        className={`cal-sans col-span-12 row-start-0 row-end-1 bg-white dark:bg-slate-700 dark:text-white py-5 text-center text-2xl lg:text-4xl rounded-[15px] font-bold`}
      >
        {toBePreviewed?.title}
      </h1>
      <h2
        className={`fira-mono place-self-end col-start-7 col-end-13 row-start-1 row-end-2 font-semibold text-[18px] dark:text-white`}
      >
        {calcDateTime(toBePreviewed.created_at)}
      </h2>
      <div
        className={`col-span-12 row-start-2 row-end-12 overflow-y-scroll bg-gray-100 p-[2.3rem] my-2 rounded-[15px] dark:bg-slate-500 dark:text-white`}
      >
        <Markdown remarkPlugins={[remarkGfm]} components={markdownStyling}>
          {markDownToText(toBePreviewed?.note)}
        </Markdown>
      </div>
      <p
        className={`w-fit h-fit row-start-12 row-end-13 ${randomColor} shadow-md fira-mono truncate p-1.5 flex items-center rounded-full`}
      >
        {toBePreviewed.tag}
      </p>
    </div>
  );
}