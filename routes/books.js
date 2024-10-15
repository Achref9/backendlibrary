const express = require('express');
const router = express.Router();
const Book = require('../models/books.js'); // Ensure this matches your export

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', getbooks, (req, res) => {
    res.json(res.books);
});

router.post('/', async (req, res) => {
    try {
        console.log('Request received with data:', req.body);
        const book = new Book(req.body);
        const savedBook = await book.save();
        console.log('Book saved:', savedBook);
        res.status(201).json({ status: 'Book Saved', book: savedBook });
    } catch (error) {
        console.error('Error saving book:', error);
        res.status(500).json({ status: 'Failed to save book', error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ status: 'Book Updated', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", getbooks, async (req, res) => {
    try {
        await res.books.deleteOne();
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getbooks(req, res, next) {
    try {
        const books = await Book.findById(req.params.id);
        if (!books) return res.status(404).json({ message: "Cannot find book" });
        res.books = books;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;
