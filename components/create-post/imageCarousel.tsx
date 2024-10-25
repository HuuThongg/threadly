import { EmblaOptionsType } from "embla-carousel"

const OPTIONS: EmblaOptionsType = { dragFree: true }

export function ImageCarousel({
  fileObj,
  onDelete,
}: {
  fileObj: SelectedFile[]
  onDelete: (index: number) => void // Add the onDelete function type
}) {
  return <EmblaCarousel fileObj={fileObj} options={OPTIONS} onDelete={onDelete} />
}

import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { X } from "lucide-react"
import { SelectedFile } from "@/schema"

type PropType = {
  fileObj: SelectedFile[]
  options?: EmblaOptionsType
  onDelete: (index: number) => void // Add onDelete prop type
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { fileObj, options, onDelete } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const getGridStyles = () => {
    const imageCount = fileObj.length

    if (imageCount === 1) {
      const { width, height } = fileObj[0]
      const aspectRatio = width / height

      //const imgHeight = Math.min(176, height);
      //const imgWidth = (imgHeight * aspectRatio);

      // Case 1: One image
      return {
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gridTemplateRows: "minmax(0, 1fr)",
        maxHeight: "430px",
        aspectRatio: aspectRatio,
      }
    } else if (imageCount === 2) {
      // Case 2: Two images
      const firstAspectRatio = fileObj[0].width / fileObj[0].height
      const secondAspectRatio = fileObj[1].width / fileObj[1].height

      const totalAspectRatio = firstAspectRatio + secondAspectRatio
      const random = 200
      const firstFr = (firstAspectRatio / totalAspectRatio) * random
      const secondFr = (secondAspectRatio / totalAspectRatio) * random

      return {
        display: "grid",
        gridTemplateColumns: `minmax(0, ${firstFr}fr) minmax(0, ${secondFr}fr)`,
        aspectRatio: totalAspectRatio,
        columnGap: "6px",
      }
    } else {
      // Case 3: More than two images
      return {
        maxHeight: "272px",
      }
    }
  }

  const gridStyles = getGridStyles()

  return (
    <div className="overflow-hidden" style={{ overflowX: "hidden" }} ref={emblaRef}>
      <div
        className="flex touch-pan-y touch-pinch-zoom"
        style={{ transform: "translate3d(0,0,0)", ...gridStyles }}>
        {fileObj.map((imageInfo, index) => {
          const { url, width, height } = imageInfo
          const aspectRatio = width / height

          const imgHeight = Math.min(276, height)
          const imgWidth = imgHeight * aspectRatio

          return (
            <div
              key={index}
              className="h-full w-full shrink-0 pr-2"
              style={{
                ...(fileObj.length >= 3
                  ? {
                      width: `${imgWidth}px`,
                      height: `${imgHeight}px`,
                    }
                  : {}),
              }}>
              <div className="relative h-full w-full cursor-pointer select-none">
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-red-300">
                  <Image
                    src={url}
                    width={imgWidth}
                    height={imgHeight}
                    alt="chigai"
                    className="pointer-events-auto absolute inset-0 size-full max-h-full select-none rounded-lg border-0 border-none object-cover outline outline-1 outline-border"
                  />
                </div>
                <div className="absolute right-[10px] top-[10px]">
                  <button
                    className="scale-100 rounded-full bg-nonative p-1 active:scale-95"
                    onClick={() => onDelete(index)}>
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EmblaCarousel
