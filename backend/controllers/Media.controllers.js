const cloudinary = require('../config/cloudinary.config'); // Adjust the path if necessary
const { PassThrough } = require('stream');
const Media = require('../models/Media');

const upload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.files[0];
        const { buffer } = file;

        const bufferStream = new PassThrough();
        bufferStream.end(buffer);

        cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                    return res.json({
                        id: result.public_id,
                        url: result.secure_url,
                        created_at: result.created_at
                    });
            }
        ).end(buffer);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    upload
};
