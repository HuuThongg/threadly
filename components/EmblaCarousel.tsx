import React, { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { EmblaOptionsType } from "embla-carousel"
import Image from "next/image"
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  return (
    <section className="m-auto max-w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          <div
            className="flex min-w-0 flex-shrink-0 flex-grow-0 space-x-1 pl-[calc(48px+24px)]"
            style={{ transform: "translate3d(0,0,0)" }}></div>
          {slides.map((index) => (
            <div
              className="flex min-w-0 flex-shrink-0 flex-grow-0 basis-[34%]"
              style={{ transform: "translate3d(0,0,0)" }}
              key={index}>
              <div className="h-[263px] w-[210px] cursor-pointer select-none">
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-red-300">
                  <Image
                    src="/chigai.jpg"
                    width={210}
                    alt="chigai"
                    className="cursor-grap absolute inset-0 h-auto w-full object-cover"
                    height={263}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
