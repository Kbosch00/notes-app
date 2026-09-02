"use server";
//import { prisma } from "@/lib/prisma";
import { Note } from "../../types/notes";

export async function createNote(title: string, content: string) {
  console.log("Creating note:", { title, content });
  return { ok: true };
}

export async function updateeNote(id: number, data: Partial<Note>) {
  console.log("Updating note:", { id, ...data });
  return { ok: true };
}

export async function borrarNote(id: number) {
  console.log("Deleting note:", { id });
  return { ok: true };
}
