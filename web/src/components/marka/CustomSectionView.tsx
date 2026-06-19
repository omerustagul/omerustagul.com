import type { CustomSection } from "@/lib/home-layout";

/* Faithful port of the prototype's CustomSection renderer (Sections.jsx):
   image / video / text blocks, contained or full-bleed. */

function toEmbed(url: string): string {
  try {
    if (/youtu\.be\//.test(url)) return "https://www.youtube.com/embed/" + url.split("youtu.be/")[1].split(/[?&]/)[0];
    if (/youtube\.com\/watch/.test(url)) {
      const v = new URL(url).searchParams.get("v");
      return "https://www.youtube.com/embed/" + v;
    }
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return "https://player.vimeo.com/video/" + vm[1];
  } catch {
    /* ignore */
  }
  return url;
}

function VideoEl({ url }: { url: string }) {
  if (!url) return <div className="cs__ph"><span>Video bağlantısı ekleyin</span></div>;
  if (/youtu\.?be|vimeo/.test(url)) {
    return <iframe className="cs__video" src={toEmbed(url)} title="video" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  }
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video className="cs__video" src={url} controls />;
}

export function CustomSectionView({ section }: { section: CustomSection }) {
  const s = section;
  const full = !!s.full;
  const align = s.align === "center" ? "center" : "left";
  const isVideo = s.type === "video";
  const isImage = s.type === "image";
  const isText = s.type === "text";

  if (isText) {
    return (
      <section className={`section cs-text cs-text--bg-none ${full ? "cs-text--full" : ""}`}>
        <div className="wrap">
          <div className={`cs-text__inner cs-text--w-narrow cs__head--${align} reveal`}>
            {s.title && <h2 className="cs__title">{s.title}</h2>}
            {s.text && <p className="cs-text__body cs-text--normal">{s.text}</p>}
          </div>
        </div>
      </section>
    );
  }

  const head = (s.title || s.text) && (
    <header className={`cs__head cs__head--${align}`}>
      {s.title && <h2 className="cs__title">{s.title}</h2>}
      {s.text && <p className="cs__text">{s.text}</p>}
    </header>
  );

  const mediaInner = isVideo ? (
    <VideoEl url={s.url || ""} />
  ) : s.src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={s.src} alt={s.title || ""} />
  ) : (
    <div className="cs__ph"><span>Görsel ekleyin</span></div>
  );

  const mediaClass = `cs__media cs__media--${isVideo ? "video" : "image"} ${full ? "cs__media--full" : ""}`;
  const media = <div className={mediaClass}>{mediaInner}</div>;

  if (full) {
    return (
      <section className="section cs-section cs-section--full" aria-label={s.title || "Bölüm"}>
        {head && <div className="wrap">{head}</div>}
        {media}
        {isImage && s.caption && <div className="wrap"><figcaption className="cs__caption">{s.caption}</figcaption></div>}
      </section>
    );
  }

  return (
    <section className="section wrap" aria-label={s.title || "Bölüm"}>
      <div className={`cs cs--${align} reveal`}>
        {head}
        {media}
        {isImage && s.caption && <figcaption className="cs__caption">{s.caption}</figcaption>}
      </div>
    </section>
  );
}
