const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const borrowController = require('../controllers/borrowController');
const checkRole = require('../middleware/auth');

// --- PUBLIC ROUTES [cite: 59] ---
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);

// --- ADMIN ROUTES (Header x-user-role: admin) [cite: 62] ---
router.post('/books', checkRole('admin'), bookController.createBook);
router.put('/books/:id', checkRole('admin'), bookController.updateBook);
router.delete('/books/:id', checkRole('admin'), bookController.deleteBook);

// --- USER ROUTES (Header x-user-role: user) [cite: 66] ---
router.post('/borrow', checkRole('user'), borrowController.borrowBook);

module.exports = router;