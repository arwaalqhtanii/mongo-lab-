
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    edition: {
        type: Number,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    hasEbook: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: true,
    },
    languages: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;  