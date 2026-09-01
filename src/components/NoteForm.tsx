"use client";
import { useParams } from "next/navigation";
import { useNotes } from "./NotesProvider";
import Link from "next/link";
import NoteFormFields from "./NoteFormFields";

function NoteForm() {
  const { id } = useParams();
  const isCreate = !id;
  const { notes } = useNotes();
  const note = !isCreate ? notes.find((n) => n.id === Number(id)) : null;
  if (!isCreate && !note) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p>Nota no encontrada</p>
        <Link
          href="/notes"
          className="text-white text-shadow-2xs font-semibold flex gap-1 w-min text-lg justify-items-center p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <span className="">Volver</span>
        </Link>
      </div>
    );
  }
  return <NoteFormFields isCreate={true} />;
}

export default NoteForm;
