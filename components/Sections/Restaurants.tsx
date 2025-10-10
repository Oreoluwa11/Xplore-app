"use client"

import React from 'react'
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Restaurants = () => {

    const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
    )

  return (
    <div className='px-8 md:px-16 py-6 mt-20'>
        <div className=''>
            <div className='flex justify-center items-center'>
                <div className=''>
                    <h1 className='font-bold text-2xl '><span className='text-primary'>ALL </span>RESTAURANTS</h1>
                    <hr className=' max-w-sm px-4 mb-0.5 border-primary' />
                    <hr className=' max-w-sm px-4 border-black' />
                </div>
            </div>

            <div className='flex justify-center items-center mt-10'>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-xs md:max-w-5xl "
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "start",
                    }}
                >
                    <CarouselContent>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </div>
    </div>
  )
}

export default Restaurants