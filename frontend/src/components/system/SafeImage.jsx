import { useState } from "react";
import { ImageOff } from "lucide-react";

// Image with a graceful "Ảnh không khả dụng" fallback when the source fails.
// className is applied to both the image and the fallback so the box keeps its
// intended size / aspect ratio.
export function SafeImage({ src, alt, className = "", style, loading, testId, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={"flex flex-col items-center justify-center gap-1.5 bg-parchment text-ink/45 " + className}
        style={style}
        role="img"
        aria-label={alt || "Ảnh không khả dụng"}
        data-testid={testId || "image-unavailable"}
      >
        <ImageOff size={22} strokeWidth={1.5} aria-hidden="true" />
        <span className="px-2 text-center text-[11px] leading-tight">Ảnh không khả dụng</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
      className={className}
      style={style}
      {...rest}
    />
  );
}
