import React from 'react'
import FavBookImg from "../assets/favoritebook.jpg"
import { Link } from 'react-router-dom'

const FavBooks = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='md:w-1/2'>
            <img src={FavBookImg} alt="" className='rouded md:w-10/12'/>
        </div>

        <div className='md:w-1/2 space-y-6'>
            <h2 className='text-5xl font-bold my-5 m:w-3/4 leading-snug'>Find Your Favorite <span className='text-blue-700'>Book Here</span></h2>
            <p className='mb-10 text-lg md:w-5/6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptatibus molestiae molestias quas eligendi 
            vero iste sit similique porro quis nesciunt, sequi quos tempora. Laborum libero modi explicabo ad neque.</p>

            {/*stats*/}
            <div className='flex flex-col sm:flex-row justify-bewteen gap-6 md:w-3/4 my-14'>
                <div>
                    <h3 className='text-3xl font-bold'>800+</h3>
                    <p className='text-base'>Book Listing</p>
                </div>
                <div>
                    <h3 className='text-3xl font-bold'>500+</h3>
                    <p className='text-base'>Register Users</p>
                </div>
                <div>
                    <h3 className='text-3xl font-bold'>2000+</h3>
                    <p className='text-base'>PDF Downloads</p>
                </div>

                <Link to="/shop" className='mt-3 block'>
                    <button className='bg-blue-700 text-white font-semibold px-5 py-2 rouded hover:bg-orange-500 transition-all duration-300'>
                        Explore More
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default FavBooks