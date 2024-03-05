import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';

function UploadBooks() {
  const bookCategories = ["Fiction", "Poetry", "Non-Fiction", "AI", "Machine Learrning", "Data", "Informatique", "Mistery", "Action",
    "Programming", "Science Fiction", "Science", "Research", "Fantasy", "Horror", "Bibliography", "Autobiography", "History",
    "Self-help", "Memoir", "Business", "Children Books", "Travel", "Religion", "Art and Design", "comic", "cookbook", "classNameic"]

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0])

    const handleChangeSelectedValue = (event) => {
      // console.log(event.target.value)
      setSelectedBookCategory(event.target.value)
    }

        

  // handle book submission *
  const handleBookSubmit = (event) => {
      event.preventDefault();
      const form = event.target;

      const bookTitle  = form.bookTitle.value;
      const authorName = form.authorName.value;
      const imagesURL = form.imagesURL.value;
      const category = form.categoryName.value;
      const bookDescription = form.bookDescription.value;
      const bookPdfURL = form.bookPdfURL.value;
      const bookPrice = parseFloat(form.bookPrice.value);
      
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { username, email } = userData;

      const bookObj = {
        bookTitle, authorName, imagesURL, category, bookDescription, bookPdfURL, bookPrice, username
      }

      console.log(bookObj)

      // send data to database

      fetch("http://localhost:5000/upload-book", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bookObj)
      }).then((res) => res.json()).then(data => {
        // console.log(data)
        alert("Book Uploaded successfully !!!")
        form.reset();
      })
  } 

  return (
    <div className='my-12 px-4'>
        <p className='mb-8 text-3xl font-bold'>Upload A Book</p>

        <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
          {/*first row*/}
          <div className='flex gap-8'>
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="bookTitle" value="Book Title" />
              </div>

              <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book Name" required />
            </div>

            {/*Author Name*/}
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="authorName" value="Author Name" />
              </div>
              
              <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" required />
            </div>
          </div> 

          {/*second row*/}
          <div className='flex gap-8'>
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="imagesURL" value="Book Image URL" />
              </div>

              <TextInput id="imagesURL" name='imagesURL' type="text" placeholder="Book image URL" required />
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
              <Textarea id="bookDescription" name='bookDescription' type="text" placeholder="Your Book Description..." required rows={5}
              className='w-full rounded'/>
         </div>

         {/*book pdf link*/}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bookPdfURL" value="Book URL" />
            </div>
            <TextInput id="bookPdfURL" name='bookPdfURL' type="text" placeholder="Book PDF URL" required />
          </div>

          {/*Book Price*/}
          <div className='mb-2 block'>
              <div className="mb-2 block">
                <Label htmlFor="bookPrice" value="Book Price" />
              </div>
              
              <TextInput id="bookPrice" name='bookPrice' type="number" step="0.01" placeholder="10" required />
          </div>                  
          
        {/*button*/}
        <Button type="submit">Upload Book</Button>
      </form>
    </div>
  )
}

export default UploadBooks