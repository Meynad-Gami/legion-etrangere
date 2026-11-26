import { Play } from "lucide-react";
import type { VideoLink } from "@/data/videos";

/** Vignette d'un documentaire : ouvre la vidéo sur YouTube, dans un nouvel onglet. */
export function VideoCard({ video, compact = false }: { video: VideoLink; compact?: boolean }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noreferrer"
      className={`group flex bg-white ring-1 ring-rule transition hover:ring-green-700 ${compact ? "items-center gap-3 p-2" : "h-full flex-col"}`}
    >
      <span className={`relative block shrink-0 overflow-hidden bg-slate ${compact ? "aspect-video w-32" : "aspect-video w-full"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className={`flex items-center justify-center bg-slate/85 text-white transition group-hover:bg-green-700 ${compact ? "h-8 w-8" : "h-12 w-12"}`}>
            <Play aria-hidden className={compact ? "h-4 w-4" : "h-5 w-5"} fill="currentColor" />
          </span>
        </span>
        <span className="absolute bottom-1.5 right-1.5 bg-black/75 px-1.5 py-0.5 text-[0.68rem] font-semibold text-white">{video.duration}</span>
      </span>
      <span className={compact ? "min-w-0" : "flex flex-1 flex-col p-4"}>
        <span className={`block font-display font-bold leading-tight text-ink group-hover:text-green-700 ${compact ? "text-[0.95rem]" : "text-lg"}`}>
          {video.title}
        </span>
        <span className="mt-0.5 block text-xs text-ink-3">{video.channel}</span>
        {!compact && <span className="mt-2 block text-sm leading-relaxed text-ink-2">{video.description}</span>}
      </span>
    </a>
  );
}
