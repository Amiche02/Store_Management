const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

//KSp8AQyyaXks42ap
app.get('/', (req, res) => {
    res.send('Hello World!')
});

//mongodb config
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:KSp7AQyyaXks42ap@cluster0.ykjkkfu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    //create a collection of documents
    const bookCollections = client.db("BookInventory").collection("books");
    const userCollections = client.db("BookInventory").collection("users");
    const customerCollections = client.db("BookInventory").collection("customers");
    const salesCollections = client.db("BookInventory").collection("sales");


//____________________________________________________Users_____________________________________________________________________________

    // Endpoint for the inscription
    app.post("/register", async (req, res) => {
        try {
            const userData = req.body;
            // insert user infos
            const result = await userCollections.insertOne(userData);
            res.send({ message: "User registered successfully" });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).send({ error: "Internal server error" });
        }
    });

    // Endpoint for the authentification
    app.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userCollections.findOne({ email });
            
            if (user && user.password === password) {
                res.send({
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                    location: user.location
                });
            } else {
                res.status(401).send({ error: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).send({ error: "Internal server error" });
        }
    });

// Update user data: PATCH method
app.patch("/update-user/:username", async (req, res) => {
  const username = req.params.username;
  const updateUserData = req.body;
  const filter = { username: username }; // Filtrer par nom d'utilisateur
  const updateDoc = {
    $set: {
      ...updateUserData
    }
  }
  const options = { upsert: true };

  try {
    // Mettre à jour les données utilisateur
    const result = await userCollections.updateOne(filter, updateDoc, options);

    if (result.modifiedCount > 0) {
      res.send({ message: "User data updated successfully" });
    } else {
      res.status(404).send({ error: "User not found or data unchanged" });
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});



    // get all informations from user
    app.get("/user/:username", async (req, res) => {
      const { username } = req.params;

      try {
        const user = await userCollections.findOne({ username: username });
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        const { password, ...userWithoutPassword } = user;
        res.send(userWithoutPassword);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });





// ________________________________________________________BookCollections_________________________________________________________
    //insert a book to the db: post method
    app.post("/upload-book", async(req, res) => {
        const data = req.body;
        const result = await bookCollections.insertOne(data);
        res.send(result);
    })

    //get all books from the db: get method
    /*app.get("/all-books", async(req,res)=>{
      const books = bookCollections.find();
      const result = await books.toArray();
      res.send(result);
    });*/

    //Update a book data: patch or update methods
      app.patch("/update-book/:id", async (req, res) => {
        const id = req.params.id;
        const updateBookdata = req.body;
        const filter = { _id: new ObjectId(id) }; 
        const updateDoc = {
          $set: {
            ...updateBookdata
          }
        }
        const options = { upsert: true };

        try {
          // UPDATE
          const result = await bookCollections.updateOne(filter, updateDoc, options);
          con
          if (result.modifiedCount > 0) {
            res.send({ message: "Book updated successfully" });
          } else {
            res.status(404).send({ error: "Book not found or data unchanged" });
          }
        } catch (error) {
          console.error("Error updating book:", error);
          res.status(500).send({ error: "Internal server error" });
        }
      });

    //find by category
    app.get("/all-books", async(req, res) =>{
      let query = {};
      if(req.query?.category){
        query = {category: req.query.category};
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    })

    //find by username and by category
    app.get("/all-books/:username", async(req, res) =>{
      const username = req.params.username;
      let query = {username: username};
      if(req.query?.category){
        query = {category: req.query.category};
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    })

  //get single book data
  app.get("/book/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await bookCollections.findOne(filter);
    res.send(result);
  });

  // Supprimer un livre par son ID
  app.delete("/delete-book/:id", async (req, res) => {
    const bookId = req.params.id;
    const filter = { _id: new ObjectId(bookId) };
    const result = await bookCollections.deleteOne(filter);
    res.send(result)
  });// Endpoint for adding a new customer
app.post("/add-customer", async (req, res) => {
    try {
        const customerData = req.body;
        // Insert customer information
        const result = await customerCollections.insertOne(customerData);
        res.send({ message: "Customer added successfully" });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

//_______________________________________________________customer_________________________________________________________________
// Endpoint for adding a new customer
app.post("/add-customer", async (req, res) => {
    try {
        const { customerUsername, sellerUsername } = req.body;

        // Check if the customer already exists for the seller
        const existingCustomer = await customerCollections.findOne({
            customerUsername: customerUsername,
            sellerUsername: sellerUsername
        });

        if (!existingCustomer) {
            // If the customer doesn't exist for the seller, insert it into the customers collection
            await customerCollections.insertOne({
                customerUsername: customerUsername,
                sellerUsername: sellerUsername
            });
            res.send({ message: "Customer added successfully" });
        } else {
            // If the customer already exists for the seller, send a message indicating so
            res.status(400).send({ error: "Customer already exists for this seller" });
        }
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});


//____________________________________________SalesBook_____________________________________________________________________________
// Endpoint for adding a new sale
app.post("/add-sale", async (req, res) => {
    try {
        const { customerUsername, bookTitle, sellerUsername } = req.body;

        // Check if the customer has already purchased this book from this seller
        const existingSale = await salesCollections.findOne({
            customerUsername: customerUsername,
            bookTitle: bookTitle,
            sellerUsername: sellerUsername
        });

        if (existingSale) {
            // If the sale already exists, update the purchase count
            await salesCollections.updateOne(
                { _id: existingSale._id },
                { $inc: { purchaseCount: 1 } }
            );
            res.send({ message: "Sale updated successfully" });
        } else {
            // If it's a new sale, insert it into the sales collection
            await salesCollections.insertOne({
                customerUsername: customerUsername,
                bookTitle: bookTitle,
                sellerUsername: sellerUsername,
                purchaseCount: 1 // Initial purchase count is 1
            });
            res.send({ message: "Sale added successfully" });
        }
    } catch (error) {
        console.error("Error adding sale:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
} run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});