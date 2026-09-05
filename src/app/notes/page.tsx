import NotesList from "@/src/components/NotesList";
import Link from "next/link";
import { getNotes } from "@/src/app/actions/notes";
import SignOutButton from "@/src/components/SignOutButton";

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div className="gap-4 p-4">
      <div className="flex bg-white/20 rounded-lg w-full p-2 justify-between">
        <h1 className="text-4xl md:text-6xl font-bold text-white ">Notas</h1>
        <SignOutButton />
      </div>
      <div className="p-2">
        <Link
          className="cursor-pointer hover:animate-pulse flex items-center hover:bg-cyan-400 hover:border-cyan-700 transition-all duration-300 rounded w-45"
          href={"/notes/new"}
          title="Crear nueva nota"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12 text-white "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-white text-xl text-shadow-2xs font-bold">
            Crear notas
          </span>
        </Link>
      </div>

      <div className="flex flex-col items-center">
        <NotesList notes={notes} />
        <Link
          className="text-4xl p-2 w-min bg-white/20 text-white hover:bg-cyan-400 hover:border-cyan-700 hover:text-5xl hover:animate-pulse
        transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer "
          href={"/"}
          title="Volver al inicio"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
