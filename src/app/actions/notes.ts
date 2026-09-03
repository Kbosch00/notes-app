"use server";
//import { Note } from "../../types/notes";
import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function createNote(title: string, content: string) {
  const trimmedTitle = title.trim();
  const trimmedContent = content?.trim() ?? "";
  if (!trimmedTitle) {
    return { ok: false as const, error: "Título es requerido" };
  }
  const note = await db.orm.public.Note.create({
    title: trimmedTitle,
    content: trimmedContent.length > 0 ? trimmedContent : null,
  });
  revalidatePath("/notes");
  return { ok: true as const, note };
}

export async function getNotes() {
  return db.orm.public.Note.orderBy((n) => n.createdAt.desc()).all();
}

export async function getNoteById(id: number) {
  return db.orm.public.Note.where({ id }).first();
}

export async function updateNote(id: number, title: string, content?: string) {
  const trimmedTitle = title.trim();
  const trimmedContent = content?.trim() ?? "";

  if (!trimmedTitle) {
    return { ok: false as const, error: "El título es obligatorio" };
  }
  const existing = await db.orm.public.Note.where({ id }).first();
  if (!existing) {
    return { ok: false as const, error: "Nota no encontrada" };
  }
  const note = await db.orm.public.Note.where({ id }).update({
    title: trimmedTitle,
    content: trimmedContent.length > 0 ? trimmedContent : null,
  });
  revalidatePath("/notes");
  revalidatePath(`/notes/${id}`);
  return { ok: true as const, note };
}

export async function deleteNote(id: number) {
  const existing = await db.orm.public.Note.where({ id }).first();
  if (!existing) {
    return { ok: false as const, error: "Nota no encontrada" };
  }
  await db.orm.public.Note.where({ id }).delete();
  revalidatePath("/notes");
  return { ok: true as const };
}
