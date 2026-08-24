import Link from "next/link";
import { FiArrowRight, FiCompass, FiGlobe, FiHeadphones, FiSearch } from "react-icons/fi";

const highlights = [
  {
    icon: FiCompass,
    title: "Discover without clutter",
    description: "Browse a focused movie and TV catalog with an immersive, touch-friendly interface.",
  },
  {
    icon: FiGlobe,
    title: "Know where to watch",
    description: "Select a region and open the official availability page for subscription, rental or purchase options.",
  },
  {
    icon: FiHeadphones,
    title: "Choose real audio tracks",
    description: "Use official human-dubbed tracks only when the licensed provider actually offers them.",
  },
];

export default function PagesHome() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 md:px-8 md:pt-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-rose-500/20 via-white/[0.05] to-blue-500/10 p-7 shadow-2xl shadow-black/30 md:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-rose-300">CineTMA Multilingual</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
            Find the story. Choose the language. Watch it officially.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            A cinematic movie discovery experience with regional provider availability, accessible language controls
            and a visual system designed for web and Android.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/discover"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose-500 px-6 font-semibold text-white transition-colors duration-200 hover:bg-rose-400 focus-visible:outline-rose-300"
            >
              Explore titles <FiArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/search"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              <FiSearch aria-hidden="true" /> Search movies
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3" aria-label="CineTMA features">
        {highlights.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition-colors duration-200 hover:border-rose-300/30 hover:bg-white/[0.07]">
            <Icon className="mb-5 size-6 text-rose-300" aria-hidden="true" />
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/55">{description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-amber-200/10 bg-amber-200/[0.04] p-5 text-sm leading-7 text-white/60 md:p-6">
        <strong className="text-amber-100">Responsible playback:</strong> CineTMA does not host or distribute movies. It
        uses catalog metadata and official availability information. Audio selection is limited to real, licensed tracks
        exposed by the provider; changing the interface language cannot create a new dub.
      </section>
    </main>
  );
}
