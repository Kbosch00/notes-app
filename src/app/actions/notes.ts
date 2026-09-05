"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/src/auth";

async function requireUserId() {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) return null;
  return Number(id);
}

export async function createNote(title: string, content: string) {
  const userId = await requireUserId();
  if (userId == null) {
    return { ok: false as const, error: "No autorizado" };
  }
  const trimmedTitle = title.trim();
  const trimmedContent = content?.trim() ?? "";
  if (!trimmedTitle) {
    return { ok: false as const, error: "Título es requerido" };
  }
  const note = await db.orm.public.Note.create({
    title: trimmedTitle,
    content: trimmedContent.length > 0 ? trimmedContent : null,
    userId,
  });
  revalidatePath("/notes");
  return { ok: true as const, note };
}

export async function getNotes() {
  const userId = await requireUserId();
  if (userId == null) return [];

  return db.orm.public.Note.where({ userId })
    .orderBy((n) => n.createdAt.desc())
    .all();
}

export async function getNoteById(id: number) {
  const userId = await requireUserId();
  if (userId == null) return null;

  const note = await db.orm.public.Note.where({ id }).first();
  if (!note || note.userId !== userId) return null;
  return note;
}

export async function updateNote(id: number, title: string, content?: string) {
  const userId = await requireUserId();
  if (userId == null) {
    return { ok: false as const, error: "No autorizado" };
  }

  const trimmedTitle = title.trim();
  const trimmedContent = content?.trim() ?? "";
  if (!trimmedTitle) {
    return { ok: false as const, error: "El título es obligatorio" };
  }

  const existing = await db.orm.public.Note.where({ id }).first();
  if (!existing || existing.userId !== userId) {
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
  const userId = await requireUserId();
  if (userId == null) {
    return { ok: false as const, error: "No autorizado" };
  }

  const existing = await db.orm.public.Note.where({ id }).first();
  if (!existing || existing.userId !== userId) {
    return { ok: false as const, error: "Nota no encontrada" };
  }

  await db.orm.public.Note.where({ id }).delete();
  revalidatePath("/notes");
  return { ok: true as const };
}
