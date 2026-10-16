"use client";

import { useEffect, useRef } from "react";

/* Ordered-dither renderer: samples a video (or poster) of the 3D bust, maps
 * luminance onto a purple palette with a 4x4 Bayer matrix, and paints it as
 * crisp square pixels — the same stipple look as Bloom's rotating mark. */

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (v) => (v + 0.5) / 16,
);

// light → dark; index 0 is "no ink"
const PALETTE: [number, number, number][] = [
  [255, 255, 255],
  [255, 255, 255],
  [226, 208, 250],
  [190, 150, 242],
  [150, 92, 232],
  [118, 52, 214],
  [94, 30, 182],
];

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** CSS px per dither cell */
  cell?: number;
};

export default function HalftoneFace({ src, poster, className, cell = 2 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!wrap || !canvas || !video) return;

    const ctx = canvas.getContext("2d");
    const sample = document.createElement("canvas");
    const sctx = sample.getContext("2d", { willReadFrequently: true });
    if (!ctx || !sctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new Image();
    img.src = poster;

    let cols = 0;
    let rows = 0;
    let out: ImageData | null = null;
    let raf = 0;
    let visible = true;
    let haveVideoFrame = false;

    const resize = () => {
      const size = wrap.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      cols = Math.max(40, Math.round(size / cell));
      rows = cols;
      sample.width = cols;
      sample.height = rows;
      out = sctx.createImageData(cols, rows);
      draw(haveVideoFrame ? video : img);
    };

    const draw = (source: CanvasImageSource) => {
      if (!out) return;
      const w = source instanceof HTMLVideoElement ? source.videoWidth : (source as HTMLImageElement).naturalWidth;
      if (!w) return;
      sctx.drawImage(source, 0, 0, cols, rows);
      const px = sctx.getImageData(0, 0, cols, rows).data;
      const o = out.data;
      const levels = PALETTE.length - 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
          // white studio backdrop → no ink; stretch the bust's tonal range
          if (lum > 0.95) {
            o[i + 3] = 0;
            continue;
          }
          let t = (1.0 - lum) / 0.78;
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          const scaled = t * levels;
          let level = Math.floor(scaled);
          if (scaled - level > BAYER[(y & 3) * 4 + (x & 3)]) level++;
          if (level > levels) level = levels;
          const c = PALETTE[level];
          o[i] = c[0];
          o[i + 1] = c[1];
          o[i + 2] = c[2];
          o[i + 3] = level <= 1 ? 0 : 255;
        }
      }
      sctx.putImageData(out, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(sample, 0, 0, canvas.width, canvas.height);
    };

    const tick = () => {
      if (visible && video.readyState >= 2) {
        haveVideoFrame = true;
        draw(video);
      }
      raf = requestAnimationFrame(tick);
    };

    img.onload = () => {
      if (!haveVideoFrame) draw(img);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (reduce) return;
      if (visible) void video.play().catch(() => undefined);
      else video.pause();
    });
    io.observe(wrap);

    if (!reduce) {
      void video.play().catch(() => undefined);
      raf = requestAnimationFrame(tick);
    }

    // gentle tilt toward the cursor
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      canvas.style.transform = `perspective(900px) rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg)`;
    };
    if (!reduce) window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [src, poster, cell]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block h-full w-full transition-transform duration-500 ease-out"
      />
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        className="hidden"
      />
    </div>
  );
}
