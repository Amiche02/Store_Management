import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';


function EditBooks() {
  const {id} = useParams();
  const {bookTitle, authorName, imagesURL, category, bookDescription, bookPdfURL, bookPrice} = useLoaderData();

    const bookCategories = [
    "Fiction",
    "Poetry",
    "Non-Fiction",
    "AI",
    "Machine Learrning",
    "Data",
    "Informatique",
    "Mistery",
    "Action",
    "Programming",
    "Science Fiction",
    "Science",
    "Research",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design",
    "comic",
    "cookbook",
    "classic"
    ]

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0])

    const handleChangeSelectedValue = (event) => {
      console.log(event.target.value)
      setSelectedBookCategory(event.target.value)
    }


  // handle book submission *
  const handleUpdate = (event) => {
      event.preventDefault();
      const form = event.target;

      const bookTitle  = form.bookTitle.value;
      const authorName = form.authorName.value;
      const imagesURL = form.imagesURL.value;
      const category = form.categoryName.value;
      const bookDescription = form.bookDescription.value;
      const bookPdfURL = form.bookPdfURL.value;
      const bookPrice = parseFloat(form.bookPrice.value);

      const updateBookObj = {
        bookTitle, authorName, imagesURL, category, bookDescription, bookPdfURL, bookPrice
      }

      //console.log(bookObj)
      //Update book data
      fetch(`http://localhost:5000/update-book/${id}`, {
        method: "PATCH",
        headers: {
          "content-ttype": "application/json",
        },
        body: JSON.stringify(updateBookObj)
      }).then((res) => res.json()).then(data => {
        // console.log(data)
        alert("Book is Updaded successfully !!!")
      })

  } 

  return (
    <div className='my-12 px-4'>
        <p className='mb-8 text-3xl font-bold'>Update The Book Data</p>

        <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
          {/*first row*/}
          <div className='flex gap-8'>
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="bookTitle" value="Book Title" />
              </div>

              <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book Name" defaultValue={bookTitle} />
            </div>

            {/*Author Name*/}
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="authorName" value="Author Name" />
              </div>
              
              <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" defaultValue={authorName} />
            </div>
          </div> 

          {/*second row*/}
          <div className='flex gap-8'>
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="imagesURL" value="Book Image URL" />
              </div>

              <TextInput id="imagesURL" name='imagesURL' type="text" placeholder="Book image URL" defaultValue={imagesURL} />
            </div>

            {/*category*/}
            <div className='lg:w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="inputState" value="Book Category"/>
              </div>

              <Select id="inputState" name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
                  {
                    bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
                  }
              </Select>

            </div>
          </div> 

          {/*bookDescription*/}
          <div>
              <div className="mb-2 block">
                  <Label htmlFor="bookDescription" value="Book Description" />
              </div>
              <Textarea id="bookDescription" name='bookDescription' type="text" placeholder="Your Book Description..." rows={5}
              className='w-full rounded' defaultValue={bookDescription}/>
         </div>

         {/*book pdf link*/}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bookPdfURL" value="Book URL" />
            </div>
            <TextInput id="bookPdfURL" name='bookPdfURL' type="text" placeholder="Book PDF URL" required defaultValue={bookPdfURL}/>
          </div>

          {/*Book Price*/}
          <div className='mb-2 block'>
              <div className="mb-2 block">
                <Label htmlFor="bookPrice" value="Book Price" />
              </div>
              
              <TextInput id="bookPrice" name='bookPrice' type="number" step="0.01" placeholder="10" defaultValue={bookPrice}/>
          </div>                  
          
        {/*button*/}
        <Button type="submit">Update</Button>
      </form>
    </div>
  )
}

export default EditBooks