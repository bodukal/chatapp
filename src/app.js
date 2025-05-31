const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ✅ Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Optional: Redirect root to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Socket.IO logic
io.on('connection', socket => {
    console.log('User connected');
    socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(3000, () => console.log('Chat app running on port 3000'));

