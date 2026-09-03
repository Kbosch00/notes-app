"use client";

import NoteCard from "./NoteCard";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NoteItem } from "@/src/types/notes";

export default function NotesList({ notes }: { notes: NoteItem[] }) {
  const router = useRouter();
  const handleSelectNote = (id: number) => {
    router.push(`/notes/${id}`);
  };
  return (
    <div
      className={`${notes.length === 0 ? "flex flex-row" : "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-flow-col-8 gap-2"} p-4 max-w-full`}
    >
      {notes.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-white text-center font-semibold text-shadow-2xs text-5xl">
            No hay notas todavía
          </p>
          <Image
            src="/empty-notes-list.svg"
            alt="Empty notes list"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content ?? ""}
            onSelect={handleSelectNote}
          />
        ))
      )}
    </div>
  );
}
