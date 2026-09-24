import Link from "next/link";
import { Jali } from "@/components/ui/patterns";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20">
      <div aria-hidden="true" className="glow top-1/4 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2" />

      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-outline-variant bg-surface-low p-7 sm:p-9">
        <Jali id="jali-404" opacity={0.05} className="text-secondary" />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-secondary">
              ४०४
            </span>
            <span className="h-px w-5 bg-secondary" aria-hidden="true" />
            <span className="label text-outline">Route not found</span>
          </div>

          <h1 className="display display-lg mt-5">
            Dead
            <br />
            <span className="text-primary">end</span>
          </h1>

          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
            This path doesn&apos;t exist. Nothing was deployed here — which, as
            a backend engineer, is exactly the kind of failure I try to make
            obvious rather than silent.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary-fill px-5 text-sm font-medium text-on-primary-fill shadow-[0_0_18px_-2px_var(--accent-halo)] transition-colors hover:bg-primary-fill-hover active:scale-[0.98]"
          >
            Back to the portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
