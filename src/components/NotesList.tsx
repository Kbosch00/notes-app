"use client";
import { useNotes } from "./NotesProvider";
import NoteCard from "./NoteCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotesList() {
  const { notes } = useNotes();
  const router = useRouter();
  const handleSelectNote = (id: number) => {
    router.push(`/notes/${id}`);
  };
  return (
    <div
      className={`${notes.length === 0 ? "flex flex-row" : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-flow-col gap-2"} p-4 max-w-full`}
    >
      {notes.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-white font-semibold text-shadow-2xs text-5xl">
            No hay notas todavía
          </p>
          <Image
            src="/empty-notes-list.svg"
            alt="Empty notes list"
            width={400}
            height={400}
          />
        </div>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onSelect={handleSelectNote}
          />
        ))
      )}
    </div>
  );
}
