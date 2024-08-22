import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import Image from 'next/image'
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  return (
    <section className="max-w-full m-auto">
      <div className=" overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          <div className="min-w-0 pl-[calc(48px+24px)] flex flex-grow-0 flex-shrink-0 space-x-1" style={{ transform: "translate3d(0,0,0)" }}>
          </div>
          {slides.map((index) => (
            <div className="min-w-0 flex flex-grow-0 flex-shrink-0 basis-[34%]" style={{ transform: "translate3d(0,0,0)" }} key={index}>
              <div className="w-[210px] h-[263px] select-none cursor-pointer">
                <div className='w-full h-full overflow-hidden rounded-lg relative bg-red-300'>
                  <Image src="/chigai.jpg" width={210} alt="chigai" className='absolute inset-0 object-cover cursor-grap w-full h-auto  ' height={263} />
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
