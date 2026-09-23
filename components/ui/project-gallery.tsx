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
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const isDown = useRef(false);
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
              className="flex w-full shrink-0 snap-center items-center justify-center bg-[#0f2747]/40"
            >
              <div className="relative aspect-[16/9.5] w-full md:aspect-[16/8.5]">
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
                    className="object-contain"
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
          Drag or swipe to explore
        </p>
      )}
    </div>
  );
}
