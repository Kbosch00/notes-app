"use server";

import bcrypt from "bcryptjs";
import { db } from "@/src/prisma/db";

export async function registerUser(
  email: string,
  password: string,
  name?: string,
) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || password.length < 6) {
    return {
      ok: false as const,
      error: "Email válido y contraseña de al menos 6 caracteres",
    };
  }

  const existing = await db.orm.public.User.where({
    email: normalizedEmail,
  }).first();

  if (existing) {
    return { ok: false as const, error: "Ese email ya está registrado" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await db.orm.public.User.create({
    email: normalizedEmail,
    passwordHash,
    name: name?.trim() || null,
  });

  return {
    ok: true as const,
    user: { id: user.id, email: user.email },
  };
}
