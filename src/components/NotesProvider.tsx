"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Note, NotesContextValue } from "../types/notes";

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const addNote = (note: Note) => {
    setNotes((prev) => [...prev, note]);
  };
  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
  const updateNote = (id: number, data: Partial<Note>) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...data } : n)));
  };
  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error("useNotes debe usarse dentro de NotesProvider");
  }
  return ctx;
}
