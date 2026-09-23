import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  BUTTON
 *  Hard-edged, offset-shadow, physical press. No blur, no gradient,
 *  2px radius ceiling. Replaces the previous soft shadcn/@base-ui button.
 * ────────────────────────────────────────────────────────────────── */

export const buttonVariants = cva(
  "group inline-flex shrink-0 items-center justify-center gap-2 border-2 font-medium whitespace-nowrap select-none transition-[transform,box-shadow,background-color,color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /* Offset shadow collapses into the surface on hover/press */
        primary:
          "border-border-strong bg-primary text-primary-foreground shadow-[4px_4px_0_var(--shadow-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--shadow-color)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        solid:
          "border-border-strong bg-foreground text-background shadow-[4px_4px_0_var(--shadow-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--shadow-color)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        outline:
          "border-border-strong bg-transparent text-foreground hover:bg-foreground hover:text-background",
        ghost:
          "border-transparent bg-transparent text-foreground hover:border-border-strong hover:bg-muted",
        link: "border-transparent bg-transparent text-primary-ink underline decoration-2 underline-offset-4 hover:decoration-loud-2",
      },
      size: {
        sm: "h-9 px-3.5 text-[0.8125rem] shadow-[3px_3px_0_var(--shadow-color)]",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-[0.9375rem] tracking-tight",
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
