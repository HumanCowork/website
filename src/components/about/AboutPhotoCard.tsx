import Image from "next/image";
import type { AboutPhoto } from "./aboutContent";

/*
 * One photograph inside its frame. The frame owns the aspect ratio (a token) and
 * the image only fills it: the source files are square, so a portrait or landscape
 * frame has to crop with object-cover.
 */
export function AboutPhotoCard({ photo }: { photo: AboutPhoto }) {
  return (
    <div className={`about-photo about-photo--${photo.aspect}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 24vw, (min-width: 640px) 46vw, 92vw"
        className="about-photo-image"
      />
    </div>
  );
}
