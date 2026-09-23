import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center px-5 py-20">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="mono-sm text-muted-foreground">[404]</span>
          <span className="mono text-muted-foreground">Route not found</span>
        </div>

        <h1 className="display display-lg mt-5 text-foreground">
          Dead
          <br />
          <span className="text-primary-ink">end</span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          This path doesn&apos;t exist. Nothing was deployed here — which, as a
          backend engineer, is exactly the kind of failure I try to make
          obvious rather than silent.
        </p>

        <Link
          href="/"
          className="mt-9 inline-flex h-11 items-center border-2 border-border-strong bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[4px_4px_0_var(--shadow-color)] transition-[transform,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--shadow-color)]"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
