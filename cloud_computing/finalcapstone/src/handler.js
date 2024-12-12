const Artikels = require('./models/artikels');
const uploadImage = require('./upload');
const predictClassification = require('./services/inferenceService');
const crypto = require('crypto');

const getAllArtikelsHandler = async (request, h) => {
    try {
        const artikels = await Artikels.findAll();
        return {
            status: 'success',
            data: artikels,
        };
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Gagal mengambil data artikels.',
        }).code(500);
    }
};

const addArtikelHandler = async (request, h) => {
    const { nama, deskripsi, penangananPenyakit, file } = request.payload;
  
    try {
        let imageUrl = null;
        if (file) {
            // Unggah gambar ke GCP Bucket
            imageUrl = await uploadImage(file);
        }

        // Simpan artikel ke database
        const artikel = await Artikels.create({
            nama,
            deskripsi,
            penanganan_penyakit: penangananPenyakit,
            image_url: imageUrl, // Simpan URL gambar di database
        });

        return h.response({
            status: 'success',
            message: 'Artikel berhasil ditambahkan.',
            data: artikel,
        }).code(201);
    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return h.response({
                status: 'fail',
                message: `Artikel dengan nama "${nama}" sudah ada.`,
            }).code(409);
        }

        return h.response({
            status: 'error',
            message: 'Gagal menambahkan artikel.',
        }).code(500);
    }
};

const updateArtikelHandler = async (request, h) => {
    const { nama } = request.params;
    const { deskripsi, penangananPenyakit } = request.payload;
    const { file } = request.payload;

    try {
        const artikel = await Artikels.findOne({ where: { nama } });

        if (!artikel) {
            return h.response({
                status: 'fail',
                message: `Artikel dengan nama "${nama}" tidak ditemukan.`,
            }).code(404);
        }

        let imageUrl = artikel.image_url; // URL gambar lama
        if (file) {
            // Unggah gambar baru ke GCP Bucket
            imageUrl = await uploadImage(file);
        }

        // Update artikel
        artikel.deskripsi = deskripsi || artikel.deskripsi;
        artikel.penanganan_penyakit = penangananPenyakit || artikel.penanganan_penyakit;
        artikel.image_url = imageUrl; // Perbarui URL gambar
        await artikel.save();

        return {
            status: 'success',
            message: `Artikel "${nama}" berhasil diperbarui.`,
            data: artikel,
        };
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'error',
            message: 'Gagal memperbarui artikel.',
        }).code(500);
    }
};

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;
   
    const { confidenceScore, label, explanation, suggestion, medicine } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
   
    const data = {
      "result": label,
      "explanation": explanation,
      "suggestion": suggestion,
      "medicine": medicine,
      "confidenceScore": confidenceScore,
      "createdAt": createdAt
    }
   
    const response = h.response({
      status: 'success',
      message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
      data
    })
    response.code(201);
    return response;
  };

module.exports = { getAllArtikelsHandler, updateArtikelHandler, addArtikelHandler, postPredictHandler };
