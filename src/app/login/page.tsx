"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/src/app/actions/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import SignInGoogleButton from "@/src/components/SignInGoogleButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "register") {
        const result = await registerUser(email, password);
        if (!result.ok) {
          toast.error(result.error);
          setLoading(false);
          return;
        }
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Email o contraseña incorrectos");
        setLoading(false);
        return;
      }

      router.push("/notes");
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
      <h1 className="text-4xl font-bold text-white text-shadow-2xs">
        {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-sm bg-white/20 p-6 rounded-lg"
      >
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded text-black bg-white/80"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded text-black bg-white/80"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-400 text-white font-bold py-2 rounded hover:bg-cyan-400 hover:border-cyan-700 
          disabled:opacity-50 cursor-pointer hover:animate-pulse transition-all duration-300 "
        >
          {loading ? "..." : mode === "login" ? "Entrar" : "Registrarme"}
        </button>
      </form>

      <button
        type="button"
        className="text-white underline text-xl cursor-pointer text-shadow-2xs"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
        }}
      >
        {mode === "login"
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
      <SignInGoogleButton />
      <Link
        href="/"
        className="text-4xl bg-white/20 text-white hover:bg-cyan-400 hover:border-cyan-700 p-2  
      hover:text-5xl hover:animate-pulse transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer"
      >
        Volver
      </Link>
    </div>
  );
}
