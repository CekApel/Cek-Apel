const { Storage } = require('@google-cloud/storage');

// Inisialisasi Storage dengan credential JSON
const storage = new Storage({
    keyFilename: './keys.json', // Ganti dengan path ke file credential Anda
    projectId: 'mindful-coder-440015-f1', // Ganti dengan project ID Anda
});

const bucketName = 'cekapelbucket'; // Nama bucket Anda
const bucket = storage.bucket(bucketName);

module.exports = { storage, bucket };
