const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const apiRoutes = require('./routes/api');
const Book = require('./models/book');       
const BorrowLog = require('./models/borrowLog'); // Pastikan nama file fisik Anda 'borrowLog.js' (huruf besar L)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Body Parser
app.use(bodyParser.json());

app.use(express.static('public'));

// 1. Route API Utama
app.use('/api', apiRoutes);

// 2. Route Halaman Utama (Root)
// Ini memperbaiki masalah "Cannot GET /" saat membuka http://localhost:3000
app.get('/', (req, res) => {
    res.send(`
        <h1>Server Perpustakaan Berjalan!</h1>
        <p>Gunakan endpoint berikut di Postman:</p>
        <ul>
            <li>GET /api/books (Lihat semua buku)</li>
            <li>POST /api/borrow (Pinjam buku)</li>
        </ul>
    `);
});

// 3. Penanganan 404 (Route Tidak Ditemukan)
// Menangani jika user mengakses halaman yang tidak ada (misal: /api/salah)
app.use((req, res, next) => {
    res.status(404).json({ message: "Halaman atau API tidak ditemukan" });
});

// 4. Error Handling Dasar 
// Menangkap error dari server (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Terjadi kesalahan pada server!',
        error: err.message 
    });
});

// Sync Database & Start Server
sequelize.sync({ force: false }).then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => console.log('Error: ' + err));