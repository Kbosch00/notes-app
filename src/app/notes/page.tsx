import NotesList from "@/src/components/NotesList";
import Link from "next/link";
import { getNotes } from "@/src/app/actions/notes";

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex bg-white/20 rounded-lg w-full p-2 justify-between">
        <h1 className="text-6xl font-bold text-white">Notas</h1>
        <Link
          className="cursor-pointer hover:animate-pulse"
          href={"/notes/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-14 hover:size-15 text-white hover:bg-lime-600 hover:border-lime-700 transition-all duration-300 rounded"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>
      <NotesList notes={notes} />
      <Link
        className="text-4xl p-2 w-min bg-white/20 text-white hover:bg-lime-600 hover:border-lime-700 hover:text-5xl hover:animate-pulse
        transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer "
        href={"/"}
      >
        Volver
      </Link>
    </div>
  );
}
