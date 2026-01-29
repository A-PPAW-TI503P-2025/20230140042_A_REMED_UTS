const Book = require('../models/book');
const BorrowLog = require('../models/borrowLog');

// User: Meminjam Buku [cite: 67]
exports.borrowBook = async (req, res) => {
    try {
        // Ambil User ID dari Header [cite: 66, 80]
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(400).json({ message: "Header x-user-id required" });

        // Ambil payload [cite: 72, 73, 74]
        const { bookId, latitude, longitude } = req.body;

        // Cek Buku
        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        // Cek Stok
        if (book.stock <= 0) {
            return res.status(400).json({ message: "Book is out of stock" });
        }

        // Logic: Kurangi Stok [cite: 75]
        book.stock -= 1;
        await book.save();

        // Logic: Catat Log dengan Lokasi [cite: 75, 77]
        const log = await BorrowLog.create({
            userId,
            bookId,
            latitude,
            longitude,
            borrowDate: new Date()
        });

        res.status(201).json({ 
            message: "Book borrowed successfully", 
            data: log,
            remainingStock: book.stock
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};