"use client"
import useBlurhash from "@/hooks/useBlurhash"
import { useState } from "react"
const DEFAULT_BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg"
export const WrapperImage1 = ({
  blur_hash,
  image_url,
}: {
  blur_hash: string
  image_url: string
}) => {
  if (!blur_hash) blur_hash = DEFAULT_BLUR_DATA_URL
  const blurDataUrl = useBlurhash(blur_hash)
  const [loaded, setLoaded] = useState(true)
  console.log("loaded", loaded)

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      {/* Placeholder */}
      <div
        className={`absolute inset-0 h-full w-full rounded-lg bg-cover bg-center transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${blurDataUrl})` }}
      />
      {/* Main Image */}
      <img
        src={image_url}
        alt="chigai"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        width={210}
        height={263}
      />
    </div>
  )
}
