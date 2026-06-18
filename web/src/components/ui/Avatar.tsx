type Size = "xs" | "sm" | "md" | "lg";

function initials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

type AvatarProps = {
  src?: string;
  name?: string;
  size?: Size;
  className?: string;
};

/** Round avatar with image or initials fallback. */
export function Avatar({ src, name = "", size = "md", className = "" }: AvatarProps) {
  const cls = ["mk-avatar", `mk-avatar--${size}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} title={name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}

type Person = { src?: string; name?: string };

/** Overlapping avatar stack with an optional "+N" chip. */
export function AvatarStack({
  people = [],
  max = 4,
  size = "sm",
}: {
  people?: Person[];
  max?: number;
  size?: Size;
}) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <span className="mk-avatar-stack">
      {shown.map((p, i) => (
        <Avatar key={i} src={p.src} name={p.name} size={size} />
      ))}
      {extra > 0 && <span className={`mk-avatar mk-avatar--${size} mk-avatar__more`}>+{extra}</span>}
    </span>
  );
}
