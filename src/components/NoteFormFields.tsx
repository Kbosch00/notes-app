"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NoteFormFieldsProps } from "@/src/types/notes";
import { toast } from "react-toastify";
import { createNote, updateNote, deleteNote } from "@/src/app/actions/notes";

function NoteFormFields({ isCreate, initialNote }: NoteFormFieldsProps) {
  const [title, setTitle] = useState(initialNote?.title ?? "");
  const [content, setContent] = useState(initialNote?.content ?? "");
  const [confirmDelete, setConfirmDelete] = useState(true);
  const router = useRouter();
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle) {
      toast.warning("Titulo requerido");
      return;
    }
    if (isCreate) {
      const result = await createNote(trimmedTitle, trimmedContent);
      if (result.ok) {
        toast.success("Nota creada");
      } else {
        toast.error("Ocurrió un error al crear la nota");
      }
    } else {
      if (!initialNote) return;
      const result = await updateNote(initialNote.id, title, content);
      if (result.ok) {
        toast.info("Nota actualizada");
      } else {
        toast.error("Ocurrió un error al actualizar la nota");
      }
    }
    router.push("/notes");
  };

  const handleDeleteNote = async (id: number) => {
    if (!isCreate) {
      const result = await deleteNote(id);
      if (result.ok) {
        toast.error("Nota eliminada");
      } else {
        toast.error("Ocurrió un error al eliminar la nota");
      }
    }
    router.push("/notes");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link
        href="/notes"
        className="text-white text-shadow-2xs font-semibold flex gap-1 w-min text-lg justify-items-center p-1 hover:animate-pulse"
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

      <h1 className="text-3xl font-bold my-6 text-white text-shadow-2xs">
        {isCreate ? "Crear nota" : "Editar nota"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 " id="note-form">
        <input
          type="text"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full border-2 border-white/90 rounded px-3 py-2 bg-white"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenido"
          rows={5}
          className="w-full border-2 border-white/90 bg-white rounded px-3 py-2"
        />

        <button
          type="submit"
          className="text-xl md:text-4xl p-2  bg-white/20 text-white hover:bg-sky-500 hover:animate-pulse 
            transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer"
        >
          {isCreate ? "Guardar nota" : "Actualizar nota"}
        </button>
        {!isCreate && initialNote && (
          <>
            <button
              type="button"
              className={`${isCreate ? "hidden" : ""} text-xl  md:text-4xl p-2  bg-white/20 text-white hover:bg-red-500  hover:animate-pulse 
                transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer mx-2`}
              onClick={() => setConfirmDelete(!confirmDelete)}
            >
              Eliminar
            </button>
            {!confirmDelete && (
              <div
                className={`${confirmDelete ? "hidden" : ""} fixed inset-0 z-50 flex items-center mt-6 justify-center`}
              >
                <div className="bg-red-500/80 p-4 rounded-lg shadow-2xs">
                  <span className="text-white text-shadow-2xs text-2xl">
                    ¿Confirmar eliminación?
                  </span>
                  <div className="flex flex-row justify-center gap-2">
                    <button
                      type="button"
                      className="text-lg p-1 w-1/2  text-white hover:bg-red-400 hover:animate-pulse 
                        transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer mx-2"
                      onClick={() => {
                        handleDeleteNote(initialNote.id);
                        setConfirmDelete(!confirmDelete);
                      }}
                    >
                      Si
                    </button>
                    <button
                      type="button"
                      className="text-lg p-1 w-1/2  text-white hover:bg-red-400 hover:animate-pulse 
                        transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer mx-2"
                      onClick={() => {
                        setConfirmDelete(!confirmDelete);
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}
export default NoteFormFields;
