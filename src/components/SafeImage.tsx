import { useState, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { MawaddahMark } from "./MawaddahLogo";

/**
 * <img> that never shows a broken image icon.
 * If the photo fails to load it falls back to a solid green panel with the Mawaddah mark.
 */
interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Show the Mawaddah mark on the fallback panel (off for images with text on top) */
  showMark?: boolean;
}

const SafeImage = ({ className, alt, showMark = true, ...props }: SafeImageProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("flex items-center justify-center bg-mawaddah-green islamic-pattern text-white", className)}
      >
        {showMark && <MawaddahMark className="h-16 w-16 opacity-90" />}
      </div>
    );
  }

  return <img {...props} alt={alt} className={className} onError={() => setFailed(true)} />;
};

export default SafeImage;
