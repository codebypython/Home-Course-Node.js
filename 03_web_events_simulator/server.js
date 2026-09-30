/**
 * 03_web_events_simulator/server.js
 * STATIC EXPRESS SERVER PHỤC VỤ DỰ ÁN 100 WEB EVENTS SIMULATOR
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from 03_web_events_simulator
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🌐 Web Events Simulator đang chạy tại: http://localhost:${PORT}`);
    console.log('💡 Mở trình duyệt để trải nghiệm tương tác với 100 sự kiện web và kiểm tra Z-Index Layer Stack!');
});
