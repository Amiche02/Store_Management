import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        // Fetch book data from the server
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/book/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [id]);

    const handleBuyClick = async () => {
        try {
            // Add sale to the "sales" collection
            const userDataFromStorage = localStorage.getItem('userData');
            const userData = userDataFromStorage ? JSON.parse(userDataFromStorage) : {};
            const { email, username, firstName, lastName, dateOfBirth, gender, location } = userData;
            await axios.post('http://localhost:5000/add-sale', {
                customerUsername: username,
                bookTitle: book.bookTitle,
                bookPrice: book.bookPrice,
                sellerUsername: book.username,
            });

            // Add customer to the "customers" collection
            await axios.post('http://localhost:5000/add-customer', {
                customerUsername: username,
                customerFirstName: firstName,
                customerLastName: lastName,
                customerGender: gender,
                customerDateOfBirth: dateOfBirth,
                customerLocation: location
            });

            // Optionally, you can handle success or show a message to the user
            //console.log('Purchase successful');
            alert("Your purchase was successful!");
        } catch (error) {
            console.error('Error making purchase:', error);
            // Optionally, you can handle errors or show a message to the user
        }
    };

    return (
        <div className="container mx-auto my-24 px-4 lg:px-24">
            {book ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="max-w-xs mx-auto">
                        <img src={book.imagesURL} alt={book.bookTitle} className="w-full h-auto" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold my-4">{book.bookTitle}</h2>
                        <p className="text-lg mb-4">{book.authorName}</p>
                        <p className="text-gray-700 mb-4">{book.bookDescription}</p>
                        <p className="text-xl font-bold mb-4">${book.bookPrice}</p>
                        <button onClick={handleBuyClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SingleBook;
