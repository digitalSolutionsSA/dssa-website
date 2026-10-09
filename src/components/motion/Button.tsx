import { useRef, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scrollToId } from "@/lib/lenis";

type Variant = "primary" | "outline" | "dark" | "outlineDark";
type Size = "sm" | "md" | "lg";

interface Props {
  children: ReactNode;
  /** "#section" smooth-scrolls; http(s) links open in a new tab */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
}

// [resting surface, colour of the fill that floods in from the pointer, text colour once filled]
const variants: Record<Variant, [string, string, string]> = {
  primary: ["bg-pink text-black", "bg-cyan", "group-hover:text-black"],
  outline: ["border border-white/25 text-white", "bg-white", "group-hover:text-black"],
  dark: ["bg-black text-white", "bg-white", "group-hover:text-black"],
  // for use on light (signal-coloured) backgrounds
  outlineDark: ["border border-black/50 text-black", "bg-black", "group-hover:text-white"],
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.68rem] gap-2",
  md: "h-12 px-7 text-[0.72rem] gap-2.5",
  lg: "h-14 px-9 text-xs gap-3",
};

/**
 * Pill button: on hover a disc of colour floods out from exactly where the pointer came in
 * (and drains back out where it leaves), while the label rolls up to a fresh copy.
 */
export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled,
  className = "",
  ariaLabel,
  fullWidth = false,
}: Props) {
  const fill = useRef<HTMLSpanElement>(null);

  const flood = (e: PointerEvent<HTMLElement>, show: boolean) => {
    const el = fill.current;
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const d = Math.hypot(r.width, r.height) * 2.1;
    gsap.set(el, { left: e.clientX - r.left, top: e.clientY - r.top, width: d, height: d, xPercent: -50, yPercent: -50 });
    gsap.to(el, { scale: show ? 1 : 0, duration: show ? 0.6 : 0.45, ease: show ? "power3.out" : "power3.in", overwrite: true });
  };

  const [surface, fillColor, filledText] = variants[variant];
  const classes = [
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-mono font-bold uppercase tracking-[0.16em] whitespace-nowrap",
    "transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40",
    surface,
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  const content = (
    <>
      <span ref={fill} aria-hidden className={`pointer-events-none absolute scale-0 rounded-full ${fillColor}`} />
      <span className={`relative z-10 block overflow-hidden transition-colors duration-300 ${filledText}`}>
        <span className="flex items-center gap-[inherit] transition-transform duration-500 ease-signal group-hover:-translate-y-full">
          {children}
        </span>
        <span aria-hidden className="absolute inset-0 flex translate-y-full items-center justify-center gap-[inherit] transition-transform duration-500 ease-signal group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </>
  );

  const pointer = {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => flood(e, true),
    onPointerLeave: (e: PointerEvent<HTMLElement>) => flood(e, false),
  };

  if (href) {
    const isHash = href.startsWith("#");
    const external = /^https?:/.test(href);
    const handleClick = (e: MouseEvent) => {
      if (isHash) {
        e.preventDefault();
        scrollToId(href.slice(1));
      }
      onClick?.();
    };
    return (
      <a
        href={href}
        className={classes}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...pointer}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel} {...pointer}>
      {content}
    </button>
  );
}
