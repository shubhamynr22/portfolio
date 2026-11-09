import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#2a63cf_0%,#6d9fe8_35%,#d4e2f6_70%,#ffffff_100%)] px-5 text-center">
      <p className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/35 backdrop-blur-md">
        404
      </p>
      <h1 className="mt-6 font-serif text-[clamp(2.75rem,8vw,5rem)] leading-none font-medium text-white">
        Nothing up here
      </h1>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/90">
        This path doesn&apos;t exist. Nothing was deployed here — exactly the
        kind of failure I try to make obvious rather than silent.
      </p>
      <Link
        href="/"
        className="btn-gloss mt-9 inline-flex h-12 items-center rounded-xl px-6 text-[0.9375rem] font-medium"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
