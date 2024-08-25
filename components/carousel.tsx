"use client"
import { EmblaOptionsType } from "embla-carousel"
import EmblaCarousel from "./EmblaCarousel"

const OPTIONS: EmblaOptionsType = { dragFree: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export function Carousel() {
  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />
}
