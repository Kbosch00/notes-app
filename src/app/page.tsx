import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4 text-white text-shadow-2xs">
        Bienvenido/a
      </h1>
      <Link
        className="text-4xl bg-white/20 text-white hover:bg-cyan-400 hover:border-cyan-700 p-2  
      hover:text-5xl hover:animate-pulse transition-all duration-300 font-bold rounded text-shadow-2xs cursor-pointer"
        href={"/login"}
      >
        Iniciar
      </Link>
    </main>
  );
}
