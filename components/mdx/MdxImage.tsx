import Image from "next/image";

interface MdxImageProps {
  src?: string;
  alt?: string;
}

export function MdxImage({ src, alt = "" }: MdxImageProps) {
  if (!src) return null;

  // External images: use regular img since next/image needs configured domains
  if (src.startsWith("http://") || src.startsWith("https://")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className="rounded-lg" loading="lazy" />;
  }

  // Local images: use next/image for optimization
  return (
    <Image
      src={src}
      alt={alt}
      width={720}
      height={400}
      className="rounded-lg"
      sizes="(max-width: 768px) 100vw, 720px"
    />
  );
}
