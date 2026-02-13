import Image from "next/image";

interface MdxImageProps {
  src?: string;
  alt?: string;
}

export function MdxImage({ src, alt = "" }: MdxImageProps) {
  if (!src) return null;

  // Local images or Cloudinary: use next/image for optimization
  if (src.startsWith("/") || src.includes("res.cloudinary.com")) {
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

  // Other external images: use regular img
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="rounded-lg" loading="lazy" />;
}
