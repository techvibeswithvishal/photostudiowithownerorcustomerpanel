const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary using .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

/**
 * Upload a file to Cloudinary
 * @param {string} filePath - local file path
 * @param {string} folder - folder name in Cloudinary
 * @returns {Promise} - resolves to uploaded file info
 */
const uploadToCloudinary = async (filePath, folder = "students") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    fs.unlinkSync(filePath); // remove file from server after upload
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { cloudinary, uploadToCloudinary };
