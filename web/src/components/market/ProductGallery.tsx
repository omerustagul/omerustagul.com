"use client";

import { useState } from "react";

/* Interactive product preview gallery — clicking a thumbnail switches the main
   preview (faithful to the prototype's product.html gallery). */
export function ProductGallery({ count = 4 }: { count?: number }) {
  const [active, setActive] = useState(0);
  return (
    <div className="prod__media reveal">
      <div className="prod__main">
        <div className="ph" style={{ aspectRatio: "4/3" }}>
          <div className="ph__in" style={{ filter: `hue-rotate(${active * 30}deg)` }} />
          <span className="ph__tag">ÖNİZLEME {active + 1}</span>
        </div>
      </div>
      <div className="prod__thumbs">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`prod__thumb ${i === active ? "on" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Önizleme ${i + 1}`}
            aria-pressed={i === active}
          >
            <div className="ph">
              <div className="ph__in" style={{ filter: `hue-rotate(${i * 30}deg)` }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
