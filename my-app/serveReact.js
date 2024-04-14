const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 6222;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve index.html for all routes that are not found
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});