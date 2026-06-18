import { Children, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number; // seconds per loop
  gap?: string;
  pauseOnHover?: boolean;
  className?: string;
};

/** Infinite horizontal marquee — partner logos, ticker text. Pauses on hover. */
export function Marquee({ children, speed = 32, gap = "4rem", pauseOnHover = true, className = "" }: Props) {
  const items = Children.toArray(children);
  const style = { "--speed": `${speed}s`, "--gap": gap } as CSSProperties;
  return (
    <div
      className={["mk-marquee", className].filter(Boolean).join(" ")}
      style={style}
      data-pause-hover={pauseOnHover}
    >
      <div className="mk-marquee__track">
        {items.map((c, i) => (
          <div className="mk-marquee__item" key={`a${i}`}>
            {c}
          </div>
        ))}
        {items.map((c, i) => (
          <div className="mk-marquee__item" key={`b${i}`} aria-hidden="true">
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
