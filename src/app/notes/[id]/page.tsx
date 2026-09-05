import NoteFormFields from "@/src/components/NoteFormFields";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNoteById } from "@/src/app/actions/notes";

type Props = { params: Promise<{ id: string }> };

export default async function NotePage({ params }: Props) {
  const { id } = await params;
  const noteId = Number(id);
  if (!Number.isFinite(noteId)) {
    notFound();
  }
  const note = await getNoteById(noteId);
  if (!note) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center gap-4 justify-center">
        <p className="text-white font-bold text-shadow-2xs text-5xl">
          Nota no encontrada
        </p>
        <Image
          alt="note not found"
          width={400}
          height={400}
          src="/note-not-found.svg"
        />
        <Link
          href="/notes"
          className="text-4xl hover:text-5xl p-2 bg-white/20 text-white hover:bg-lime-500 hover:animate-pulse 
        transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer"
        >
          Volver
        </Link>
      </div>
    );
  }

  return (
    <NoteFormFields
      isCreate={false}
      initialNote={{
        id: note.id,
        title: note.title,
        content: note.content ?? "",
      }}
    />
  );
}
