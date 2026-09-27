"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const [preview, setPreview] = useState<number | null>(null);
  const isDown = useRef(false);
  const dragged = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const updateActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    const idx = Math.round(el.scrollLeft / w);
    setActive(Math.max(0, Math.min(images.length - 1, idx)));
  }, [images.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActive, { passive: true });
    const onResize = () => updateActive();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", onResize);
    };
  }, [updateActive]);

  // lightbox: Escape to close + lock background scroll
  useEffect(() => {
    if (preview === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [preview]);

  const scrollTo = useCallback(
    (idx: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(images.length - 1, idx));
      el.scrollTo({
        left: clamped * el.clientWidth,
        behavior: "smooth",
      });
    },
    [images.length],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDown.current = true;
    dragged.current = false;
    el.setPointerCapture(e.pointerId);
    startX.current = e.clientX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.clientX - el.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 8) dragged.current = true;
    el.scrollLeft = scrollLeft.current - walk;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    isDown.current = false;
    if (el) el.releasePointerCapture(e.pointerId);
    updateActive();
  };

  if (images.length === 0) return null;

  const single = images.length === 1;

  return (
    <div className="border border-line bg-soft/[0.06]">
      <div className="relative">
        {/* scroller */}
        <div
          ref={scrollerRef}
          onPointerDown={single ? undefined : onPointerDown}
          onPointerMove={single ? undefined : onPointerMove}
          onPointerUp={single ? undefined : onPointerUp}
          onPointerLeave={single ? undefined : onPointerUp}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x select-none"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              onClick={() => {
                if (dragged.current) {
                  dragged.current = false;
                  return;
                }
                if (!failed.has(i)) setPreview(i);
              }}
              className="flex w-full shrink-0 cursor-zoom-in snap-center items-center justify-center bg-[#0f2747]/40"
            >
              {/* presentation frame — fixed 16:9, height derived from responsive width */}
              <div className="relative aspect-video w-full">
                {failed.has(i) ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0f2747]/60 px-6 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                      {pad2(i + 1)} — {title}
                    </p>
                    <p className="text-sm text-muted">Image pending</p>
                  </div>
                ) : (
                  <Image
                    src={src}
                    alt={`${title} — image ${pad2(i + 1)}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-contain object-center"
                    draggable={false}
                    onError={() =>
                      setFailed((prev) => {
                        const n = new Set(prev);
                        n.add(i);
                        return n;
                      })
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* controls overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 md:p-4">
          <div className="pointer-events-auto flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => scrollTo(active - 1)}
              disabled={active === 0}
              className="grid h-8 w-8 place-items-center border border-line bg-background text-xs text-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-30 disabled:pointer-events-none md:h-9 md:w-9"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => scrollTo(active + 1)}
              disabled={active === images.length - 1}
              className="grid h-8 w-8 place-items-center border border-line bg-background text-xs text-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-30 disabled:pointer-events-none md:h-9 md:w-9"
            >
              →
            </button>
          </div>

          <span className="pointer-events-auto border border-line bg-background px-2.5 py-1 font-mono text-xs tracking-wide text-faint">
            {pad2(active + 1)} / {pad2(images.length)}
          </span>
        </div>
      </div>

      {!single && (
        <p className="border-t border-line py-2 text-center font-mono text-xs uppercase tracking-[0.14em] text-faint/70">
          Drag or swipe to explore — click to enlarge
        </p>
      )}

      {/* fullscreen preview — natural aspect ratio, never cropped */}
      {preview !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — image ${pad2(preview + 1)} preview`}
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close preview"
            onClick={() => setPreview(null)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-line bg-background text-base text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            ✕
          </button>
          <div
            className="relative h-[80vh] w-full max-w-6xl sm:h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[preview]}
              alt={`${title} — image ${pad2(preview + 1)}`}
              fill
              sizes="90vw"
              className="object-contain object-center"
              draggable={false}
            />
          </div>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 border border-line bg-background px-2.5 py-1 font-mono text-xs tracking-wide text-faint">
            {pad2(preview + 1)} / {pad2(images.length)}
          </span>
        </div>
      )}
    </div>
  );
}
