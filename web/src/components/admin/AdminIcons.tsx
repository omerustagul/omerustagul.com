export const ICONS: Record<string, string> = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  ai: "M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z",
  blog: "M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h8",
  projects: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  courses: "M22 9L12 5 2 9l10 4 10-4zM6 11v5c0 1 3 2 6 2s6-1 6-2v-5",
  market: "M6 7h12l1 13H5zM9 7a3 3 0 016 0",
  media: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6",
  appearance: "M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-1.5 1-2 2-2h1a4 4 0 004-4c0-5-4-8-9-8zM7.5 12a1 1 0 100-2 1 1 0 000 2zM12 8a1 1 0 100-2 1 1 0 000 2zM16.5 12a1 1 0 100-2 1 1 0 000 2z",
  users: "M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M17 11a4 4 0 000-8M22 21c0-2.7-1.5-5-3.7-6.2",
  seo: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  settings: "M12 9a3 3 0 100 6 3 3 0 000-6zM19.4 13l1.5 2.6-2 3.4-2.9-.8a7 7 0 01-1.7 1l-.6 3H10.3l-.6-3a7 7 0 01-1.7-1l-2.9.8-2-3.4L4.6 13a7 7 0 010-2L3.1 8.4l2-3.4 2.9.8a7 7 0 011.7-1l.6-3h3.4l.6 3a7 7 0 011.7 1l2.9-.8 2 3.4L19.4 11a7 7 0 010 2z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6L6 18",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  plus: "M12 5v14M5 12h14",
  edit: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
  external: "M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5",
  chevron: "M6 9l6 6 6-6",
  link: "M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1",
  pages: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5M9 13h6M9 17h6",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  tablet: "M6 3h12a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",
  mobile: "M8 2h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V3a1 1 0 011-1zM11 19h2",
  grip: "M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01",
};

export function Icon({
  name,
  size = 20,
  stroke = 1.8,
  fill = false,
  className,
  style,
}: {
  name: string;
  size?: number;
  stroke?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const d = ICONS[name] || "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d={d} />
    </svg>
  );
}
