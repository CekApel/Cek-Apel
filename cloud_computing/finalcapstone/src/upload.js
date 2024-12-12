const { bucket } = require('./gcs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadImage = async (file) => {
    const fileName = `${uuidv4()}${path.extname(file.hapi.filename)}`;
    const blob = bucket.file(fileName);

    const stream = blob.createWriteStream({
        resumable: false,
        contentType: file.hapi.headers['content-type'],
    });

    return new Promise((resolve, reject) => {
        stream.on('error', (err) => {
            reject(err);
        });

        stream.on('finish', async () => {
            // Atur file menjadi publik
            await blob.makePublic();

            // URL akses publik
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            resolve(publicUrl);
        });

        file.pipe(stream);
    });
};

module.exports = uploadImage;
