const {
  addArtikelHandler,
  getAllArtikelsHandler,
  getArtikelByIdHandler,
  updateArtikelHandler,
  deleteArtikelHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/artikels',
    handler: getAllArtikelsHandler,
  },
  {
    method: 'PUT',
    path: '/artikels/{nama}',
    handler: updateArtikelHandler,
  },
];

module.exports = routes;
