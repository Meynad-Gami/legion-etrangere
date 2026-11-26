import { Credit } from "@/components/ui/Credit";
import type { MediaImage } from "@/data/types";

/** Document d'archive (image libre de droits), avec légende, auteur et licence. */
export function ArchiveFigure({ image, className = "", tall = false }: { image: MediaImage; className?: string; tall?: boolean }) {
  if (!image.src) return null;
  return (
    <figure className={className}>
      <div className="relative">
      <a href={image.sourceUrl ?? image.src} target="_blank" rel="noreferrer" className="group block overflow-hidden bg-paper-2">
        <img
          src={image.src}
          alt={image.caption}
          loading="lazy"
          className={`w-full object-cover grayscale-[20%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
        />
      </a>
      <Credit credit={image.credit} license={image.license} />
      </div>
      <figcaption className="mt-2 text-[0.8rem] leading-snug text-ink-2">
        {image.caption}
      </figcaption>
    </figure>
  );
}
