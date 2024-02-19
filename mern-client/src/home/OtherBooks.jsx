import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';

function OtherBooks() {
  const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setBooks(data.slice(4, 9)));
    }, []); 
  return (
    <div>
        <BookCards books={books} headLine="Others Books"/>
    </div>
  )
}

export default OtherBooks