type StarProps = { filled: boolean };

function Star({ filled }: StarProps) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={filled ? "" : "mk-rating__star--empty"}
      aria-hidden="true"
    >
      <path
        d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  value?: number;
  max?: number;
  count?: number;
  showScore?: boolean;
  className?: string;
};

/** Star rating + numeric score in mono — course / product cards. */
export function Rating({ value = 0, max = 5, count, showScore = true, className = "" }: Props) {
  const full = Math.round(value);
  return (
    <span className={["mk-rating", className].filter(Boolean).join(" ")}>
      <span className="mk-rating__stars" aria-hidden="true">
        {Array.from({ length: max }).map((_, i) => (
          <Star key={i} filled={i < full} />
        ))}
      </span>
      {showScore && <span className="mk-rating__score">{value.toFixed(1)}</span>}
      {count != null && <span className="mk-rating__count">({count})</span>}
    </span>
  );
}
