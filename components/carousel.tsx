"use client"
import EmblaCarousel from "./EmblaCarousel"
import { PostImage } from "@/types"

export function Carousel({ postImages }: { postImages: PostImage[] }) {
  return <EmblaCarousel postImages={postImages} />
}
