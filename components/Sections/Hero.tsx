import React from 'react'
import CoverflowSlider from "@/components/CoverflowSlider";

const Hero = () => {
  return (
    <div>
      <div className='px-8 md:px-20 py-10 mt-20 md:grid md:grid-cols-2 gap-10 '>

        <div className='mb-10 mb-mb-0'>
          <div className='max-w-2xl'>
            <h1 className='text-6xl font-bold'>Discover <span className='text-primary'>Lagos&apos;s Best</span> </h1>
            <h1 className='text-4xl font-bold mt-5'> <span className='text-primary'>Restaurants</span> — All in One Place</h1>
            <p className='mt-5 text-2xl'>Explore top spots across Lagos. Compare menus, prices and reviews. 
              find the perfect place to eat — from local favorites to hidden gems.
            </p>
          </div>

          <div className='ml-2 mt-5'>
            <a href="/restaurant">
              <button className='px-10 py-4 text-background bg-primary rounded-xl hover:cursor-pointer'>
                Explore Restaurants
              </button>
            </a>
          </div>
        </div>

        <CoverflowSlider />
      </div>
    </div>
  )
}

export default Hero