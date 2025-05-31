const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(__dirname));

app.get('/api/images', (req, res) => {
  const imagesDir = path.join(__dirname, 'images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Unable to read images folder' });
    // Only return image files (jpg, png, jpeg, gif)
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    res.json(imageFiles.map(f => `/images/${f}`));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));