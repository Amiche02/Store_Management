import React from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex item-center'>
        <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
            {/*left side*/}
            <div className='md:w-1/2 space-y-8 h-full'>
                <h2 className='text-5xl font-bold leading-snug text-black'>
                    Buy and Sell Your Books <span className='text-blue-700'>for the Prices</span>
                </h2>
                <p className='w-4/54'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In nobis distinctio deleniti dicta quo rem tenetur 
                    accusantium labore. Provident voluptas dicta excepturi aliquam aut eligendi voluptates molestiae sequi commodi 
                    recusandae.
                </p>
                <div>
                    <input type="search" name="search" id="search" placeholder="Search a Book"  className='py-2 px-2 rounded-s-sm 
                    outline-none'/>
                    <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-orange-500 transition-all ease-in 
                    duration-200'>Search</button>
                </div>
            </div>

            {/*right side*/}
            <div>
                <BannerCard></BannerCard>
            </div>
        </div>
    </div>
  )
}

export default Banner