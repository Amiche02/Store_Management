import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() =>{
    fetch('http://localhost:5000/all-books')
      .then(res => res.json()) // Call json() method here
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books Are Here</h2>


      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:gridd-cols-2 md:grid-cols-3 grid-cols-1'>
        {books.map(book => (
          // eslint-disable-next-line react/jsx-key
          <Card
            className="max-w-sm"
          >
            <img src={book.imagesURL} alt="" className='h-100'/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.bookTitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>

            <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy Now</button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
