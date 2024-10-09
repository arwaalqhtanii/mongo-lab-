

import express from 'express';
import mongoose from 'mongoose';
import Book from './models/book.js'; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URL) 
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.log('Connection failed', err));

app.post('/addBook', (req, res) => {
    const book = new Book({
        title: req.body.title,  
        author: req.body.author,
        edition: req.body.edition,
        publicationDate: req.body.publicationDate,
        hasEbook: req.body.hasEbook,
        price: req.body.price,
        languages: req.body.languages,
        category: req.body.category,
    }); 

    book.save()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});


app.get('/books', (req, res) => {
    Book.find()
        .then(books => res.send(books))
        .catch(err => res.status(500).send(err));
});


app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.send(book))
        .catch(err => res.status(500).send(err));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 