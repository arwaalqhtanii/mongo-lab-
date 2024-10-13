// import express from "express";
// import mongoose from "mongoose";
// import Book from "./models/book.js";
// import User from "./models/User.js";
// import dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// dotenv.config();
// const app = express();
// app.use(express.json());
// const port = process.env.PORT;

// async function main() {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("Connected to MongoDB Atlas");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//     process.exit(1);
//   }
// }
// main();


// app.get("/books", async (req, res) => { 
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     console.error("Error fetching books:", err);
//     res.status(500).json({ error: "Failed to fetch books", details: err });
//   }
// });

// app.post("/books", async (req, res) => {
//   try {
//     const newBook = new Book(req.body);
//     const savedBook = await newBook.save();
//     res.status(200).json(savedBook);
//   } catch (err) {
//     console.error("Error saving book:", err);
//     res.status(400).json({ error: "Failed to save book", details: err });
//   }
// });

// // Get a book by ID
// app.get("/books/:id", async (req, res) => {
//   const bookId = req.params.id;
//   try {
//     const book = await Book.findById(bookId);
//     if (book) {
//       res.json(book);
//     } else {
//       res.status(404).send("Book not found");
//     }
//   } catch (err) {
//     console.error("Error fetching book:", err);
//     res.status(500).json({ error: "Failed to fetch book", details: err });
//   }
// });

// // Delete a book
// app.delete("/books/:id", async (req, res) => {
//   const bookId = req.params.id;
//   try {
//     const book = await Book.findById(bookId);
//     if (book) {
//       await book.remove(); // Use remove() instead of delete()
//       res.send("Book deleted");
//     } else {
//       res.status(404).send("Book not found");
//     }
//   } catch (err) {
//     console.error("Error deleting book:", err);
//     res.status(500).json({ error: "Failed to delete book", details: err });
//   }
// });


// app.patch("/books/:id", async (req, res) => {
//   const bookId = req.params.id;
//   try {
//     const book = await Book.findById(bookId);
//     if (book) {
//       book.set(req.body);
//       const updatedBook = await book.save();
//       res.json(updatedBook);
//     } else {
//       res.status(404).send("Book not found");
//     }
//   } catch (err) {
//     console.error("Error updating book:", err);
//     res.status(500).json({ error: "Failed to update book", details: err });
//   }
// });
// function authenticateToken(req, res, next) {
//   const token = req.headers["authorization"];

//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid Token" });
 
//     req.user = user; 

//     next();
//   });
// }
// //regis
// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }


//     const hashedPassword = await bcrypt.hash(password, 10);

 
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

   
//     await newUser.save();

 
//     const token = jwt.sign(
//       { id: newUser._id, email: newUser.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

 
//     res.status(201).json({
//       message: "User registered successfully",
//       user: { username: newUser.username, email: newUser.email }, // avoid sending the password
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// //login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
 
//   try {
//     // Check if the user exists by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Verify the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Incorrect password' });
//     }

//     // Create a JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' } // Token expires in 1 hour 
//     );

//     // Send login success response
//     res.status(200).json({
//       message: 'Login successful',
//       user: { username: user.username, email: user.email }, // filter the returned user object
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// //articles

// app.post("/articles", authenticateToken, async (req, res) => {
//   const { title, content } = req.body;

//   try {

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }


//     const newArticle = {
//       title,
//       content,
//       createdAt: new Date()
//     };

  
//     user.articles.push(newArticle);


//     await user.save();

    
//     res.status(201).json({
//       message: "Article added successfully",
//       article: newArticle
//     });
//   } catch (err) {
//     console.error("Error adding article:", err);
//     res.status(500).json({ message: "Failed to add article", error: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// }); 


import express from "express";
import mongoose from "mongoose";
import Book from "./models/book.js";
import User from "./models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}
main();


app.get("/books", async (req, res) => { 
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to fetch books", details: err.message });
  }
});


app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error("Error saving book:", err);
    res.status(400).json({ error: "Failed to save book", details: err.message });
  }
});


app.get("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Failed to fetch book", details: err.message });
  }
});


app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.remove();
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book", details: err.message });
  }
});


app.patch("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.set(req.body);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Failed to update book", details: err.message });
  }
});

// Middleware للتحقق من صلاحية الرمز JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // التأكد من وجود الرمز

  if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });

    req.user = user;
    next();
  });
}

// تسجيل مستخدم جديد
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { username: newUser.username, email: newUser.email },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// تسجيل الدخول
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: { username: user.username, email: user.email },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// إضافة مقال
app.post("/articles", authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newArticle = {
      title,
      content,
      createdAt: new Date()
    };

    user.articles.push(newArticle);

    await user.save();

    res.status(201).json({
      message: "Article added successfully",
      article: newArticle
    });
  } catch (err) {
    console.error("Error adding article:", err);
    res.status(500).json({ message: "Failed to add article", error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
