import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { PostImage } from "@/types"
import useBlurhash from "@/hooks/useBlurhash";

const EmblaCarousel = ({ postImages }: { postImages: PostImage[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true })
  return (
    <section className="m-auto max-w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          <div
            className="min-w-0 shrink-0 flex grow-0 space-x-1 pl-[calc(48px+24px)]"
            style={{ transform: "translate3d(0,0,0)" }}></div>
          {postImages.map(({ image_url, blurHash }, index) => {
            const blurDataUrl = useBlurhash(blurHash);
            return (
              <div
                className="flex min-w-0 shrink-0 grow-0 basis-[34%]"
                style={{ transform: "translate3d(0,0,0)" }}
                key={index}>
                <div className="h-[263px] w-[210px] cursor-pointer select-none">
                  <div className="relative h-full w-full overflow-hidden rounded-lg ">
                    <Image
                      src={image_url}
                      width={210}
                      alt="chigai"
                      className="cursor-grap absolute inset-0 h-auto w-full object-cover"
                      height={263}
                      placeholder="blur"
                      blurDataURL={blurDataUrl}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
