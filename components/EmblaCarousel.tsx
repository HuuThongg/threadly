import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { PostImage } from "@/types"
import useBlurhash from "@/hooks/useBlurhash"
import { WrapperImage } from "./wrapper-image"

const EmblaCarousel = ({ postImages }: { postImages: PostImage[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true })
  return (
    <section className="m-auto max-w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          <div
            className="flex min-w-0 shrink-0 grow-0 space-x-1 pl-[calc(48px+24px)]"
            style={{ transform: "translate3d(0,0,0)" }}></div>
          {postImages.map(({ image_url, blur_hash }, index) => (
            <WrapperImage image_url={image_url} blur_hash={blur_hash} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
