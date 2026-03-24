const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

/**
 * POST /api/upload/image
 * Accepts a single file field named "image", uploads to Cloudinary,
 * and returns the secure URL.
 */
router.post('/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  res.json({
    success: true,
    url: req.file.path,          // Cloudinary secure URL
    public_id: req.file.filename, // useful for future deletion
  });
});

module.exports = router;
