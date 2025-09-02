import Highlight from "react-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { type Element } from "hast";

// Define the props type that react-markdown uses
type MarkdownComponentProps = {
  node?: Element;
  [key: string]: any;
};

export const markdownStyling = {
  h1: ({ node, ...props }: MarkdownComponentProps) => (
    <h1 className="text-2xl font-bold mb-4 farro" {...props}></h1>
  ),
  h2: ({ node, ...props }: MarkdownComponentProps) => (
    <h2
      className="text-xl font-bold mb-3 patrick-hand tracking-wider"
      {...props}
    ></h2>
  ),
  h3: ({ node, ...props }: MarkdownComponentProps) => (
    <h3 className="font-bold mb-3 patrick-hand tracking-wider" {...props}></h3>
  ),
  p: ({ node, ...props }: MarkdownComponentProps) => (
    <p className="mb-2 patrick-hand tracking-wider" {...props}></p>
  ),
  img: ({ node, ...props }: MarkdownComponentProps) => (
    <img className="w-fit mx-auto" {...props} />
  ),
  ul: ({ node, ...props }: MarkdownComponentProps) => (
    <ul
      className="list-disc px-8 mb-4 patrick-hand tracking-wider"
      {...props}
    ></ul>
  ),
  ol: ({ node, ...props }: MarkdownComponentProps) => (
    <ol
      className="list-decimal ml-6 mb-4 patrick-hand tracking-wider"
      {...props}
    ></ol>
  ),
  li: ({ node, ...props }: MarkdownComponentProps) => (
    <li className="ml-3 my-2.5 patrick-hand tracking-wider" {...props}></li>
  ),
  table: ({ node, ...props }: MarkdownComponentProps) => (
    <table
      className={`w-full my-2 patrick-hand tracking-wider`}
      {...props}
    ></table>
  ),
  td: ({ node, ...props }: MarkdownComponentProps) => (
    <td
      className={`border border-slate-300 p-1 patrick-hand tracking-wider`}
      {...props}
    ></td>
  ),
  hr: ({ node, ...props }: MarkdownComponentProps) => (
    <hr
      className={`my-3 border border-slate-300 patrick-hand tracking-wider`}
      {...props}
    />
  ),
  th: ({ node, ...props }: MarkdownComponentProps) => (
    <th
      className={`border border-slate-300 p-1 bg-slate-200 patrick-hand tracking-wider`}
      {...props}
    ></th>
  ),
  a: ({ node, ...props }: MarkdownComponentProps) => (
    <a
      target="_blank"
      className={`hover:underline text-indigo-600 visited:text-indigo-300 patrick-hand tracking-wider`}
      {...props}
    ></a>
  ),
  code: ({ node, ...props }: MarkdownComponentProps) => (
    <code
      className={`bg-gray-200 text-sm fira-mono text-slate-800 py-1 px-0.5 rounded-lg`}
      {...props}
    ></code>
  ),
  pre: ({ node }: MarkdownComponentProps) => {
    // const codeBlockText: string =
    //   (node.children[0] as HTMLElement).children[0]?.textContent || "";

    const codeElement = node?.children?.[0] as Element;
    const codeBlockText =
      codeElement?.children?.[0]?.type === "text"
        ? (codeElement.children[0] as any).value
        : "";

    return (
      <pre className={`shadow-md bg-[#282c34] p-2.5 rounded-lg`}>
        <Highlight className={`fira-mono overflow-x-scroll`}>
          {codeBlockText}
        </Highlight>
      </pre>
    );
  },
  blockquote: ({ node, ...props }: MarkdownComponentProps) => (
    <blockquote
      className={`bg-gray-900 text-slate-100 p-2.5 rounded-lg my-4`}
      {...props}
    ></blockquote>
  ),
};

export function markDownToText(mdText: string): string {
  if (!mdText)
    return "**Nothing noted down. Jot down your ideas in markdown...**";

  try {
    // First try to decode base64
    const decodedBytes = Uint8Array.from(atob(mdText), (c) => c.charCodeAt(0));
    const decodedText = new TextDecoder().decode(decodedBytes);

    // If decoded text looks valid, return it
    if (decodedText && !decodedText.includes("�")) {
      return decodedText;
    }
    // If decoded text looks corrupted, return original
    return mdText;
  } catch {
    // If decoding fails, return original text
    return mdText;
  }
}
