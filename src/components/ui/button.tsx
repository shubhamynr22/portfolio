import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  BUTTON
 *
 *  The reference's control language: a 4px radius, a single hairline, and
 *  a press that scales down rather than a shadow that moves. The primary
 *  variant is the only element on the site carrying an accent halo — it is
 *  how the page says "this one, not the others".
 * ────────────────────────────────────────────────────────────────── */

export const buttonVariants = cva(
  "group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap select-none transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-primary-fill text-on-primary-fill shadow-[0_0_18px_-2px_var(--accent-halo)] hover:bg-primary-fill-hover",
        outline:
          "border border-outline-variant bg-transparent text-foreground hover:border-outline hover:bg-surface-high",
        subtle:
          "border border-outline-variant bg-surface-high text-foreground hover:bg-surface-highest",
        ghost:
          "border border-transparent bg-transparent text-foreground hover:bg-surface-high",
        link: "border border-transparent bg-transparent text-primary underline decoration-1 underline-offset-4 hover:decoration-2",
      },
      size: {
        sm: "h-8 px-3 font-mono text-[0.6875rem] tracking-[0.1em] uppercase",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-[0.9375rem]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/** Same visual language, for anchor tags (mailto:, download, external). */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
