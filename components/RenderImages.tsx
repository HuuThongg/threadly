import { PostImage } from "@/types"
import { WrapperImage1 } from "./wrapper-image1"
import { Carousel } from "./carousel"

export function RenderImages({ images }: { images: PostImage[] }) {
  return (
    <>
      {images.length === 1 && (
        <div>
          <div className="w-full pt-2">
            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-lg">
                {/* Placeholder */}

                {/* Main Image */}
                <img src={images[0].image_url} alt="chigai" className={`object-cover}`} />
              </div>

              {/*<WrapperImage1
                    image_url={postInfo.images[0].image_url}
                    blur_hash={postInfo.images[0].blur_hash}
                  />*/}
            </div>
          </div>
        </div>
      )}
      {images.length === 2 && (
        <div>
          <div className="w-full pt-2">
            <div className="relative h-auto w-full">
              <div className="flex h-auto w-full flex-row gap-x-2">
                {images.map((image) => (
                  <div
                    className="h-[263px] w-[265px] cursor-pointer select-none"
                    key={image.image_url}>
                    <WrapperImage1
                      image_url={image.image_url}
                      blur_hash={image.blur_hash}
                      key={image.blur_hash}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* image caoursel*/}
      {images.length > 2 && (
        <div className="w-full pt-2">
          <div className="relative ml-[-72px] w-[calc(100%+96px)]">
            <Carousel postImages={images} />
          </div>
        </div>
      )}
    </>
  )
}
