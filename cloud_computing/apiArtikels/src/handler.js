const artikels = require('./artikels');

const getAllArtikelsHandler = (request, h) => {
  return {
    status: 'success',
    data: artikels,
  };
};

const updateArtikelHandler = (request, h) => {
  const { nama } = request.params; // Nama artikel yang akan diupdate
  const { deskripsi, penangananPenyakit } = request.payload;

  // Cari artikel berdasarkan nama
  const artikelIndex = artikels.findIndex((artikel) => artikel.nama === nama);

  if (artikelIndex === -1) {
    return h.response({
      status: 'fail',
      message: `Artikel dengan nama "${nama}" tidak ditemukan.`,
    }).code(404);
  }

  // Update artikel
  artikels[artikelIndex] = {
    ...artikels[artikelIndex],
    deskripsi: deskripsi || artikels[artikelIndex].deskripsi,
    penangananPenyakit: penangananPenyakit || artikels[artikelIndex].penangananPenyakit,
  };

  return {
    status: 'success',
    message: `Artikel "${nama}" berhasil diperbarui.`,
    data: artikels[artikelIndex],
  };
};

module.exports = { getAllArtikelsHandler, updateArtikelHandler };
