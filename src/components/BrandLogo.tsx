interface Props {
  /** white for the dark site (default); black for light backgrounds */
  tone?: "white" | "black";
  /** Size it by height, e.g. "h-9" — the width follows the logo's proportions */
  className?: string;
  eager?: boolean;
}

/**
 * The Digital Solutions SA logo. The source artwork sits on a 2000×1125 canvas with wide empty
 * margins, so this crops to the artwork itself (aspect ≈ 2.25:1, a hair of breathing room) and every placement sizes alike.
 */
export default function BrandLogo({ tone = "white", className = "h-9", eager = false }: Props) {
  return (
    <span className={`block aspect-[2.25/1] shrink-0 overflow-hidden ${className}`}>
      <img
        src={`/brand/dssa-logo-${tone}.webp`}
        alt="Digital Solutions SA — Innovation without limits"
        width={2000}
        height={1125}
        draggable={false}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full select-none object-cover object-[50%_31%]"
      />
    </span>
  );
}
