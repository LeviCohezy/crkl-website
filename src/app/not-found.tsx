import Link from "next/link";

const LETTERS = ["4", "0", "4"];

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-1 flex-col items-center justify-center bg-blush px-6 py-32 text-center text-white">
      <p
        aria-hidden
        className="font-display flex gap-[4vw] text-[30vw] leading-[0.8] font-light sm:text-[22vw]"
      >
        {LETTERS.map((letter, index) => (
          <span key={index} className="outline-text">
            {letter}
          </span>
        ))}
      </p>
      <h1 className="font-display mt-10 text-4xl font-light sm:text-5xl">
        Deze tafel bestaat niet
      </h1>
      <p className="mt-4 max-w-sm text-white/95">
        De pagina die u zocht is verhuisd of heeft nooit bestaan.
      </p>
      <Link
        href="/"
        className="eyebrow mt-10 rounded-full bg-white px-8 py-4 text-ink transition-transform duration-500 ease-expo hover:scale-105"
      >
        Terug naar de startpagina
      </Link>
    </main>
  );
}
