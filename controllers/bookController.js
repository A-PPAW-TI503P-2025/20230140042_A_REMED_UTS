const Book = require('../models/book');

// Public: Melihat semua buku [cite: 60]
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Public: Detail buku [cite: 61]
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: Tambah buku [cite: 65]
exports.createBook = async (req, res) => {
    try {
        const { title, author, stock } = req.body;
        // Validasi sederhana [cite: 83]
        if (!title || !author) {
            return res.status(400).json({ message: "Title and Author are required" });
        }
        const book = await Book.create({ title, author, stock });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: Update buku [cite: 65]
exports.updateBook = async (req, res) => {
    try {
        const { title, author, stock } = req.body;
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.update({ title, author, stock });
        res.json({ message: 'Book updated', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: Hapus buku [cite: 65]
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.destroy();
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};