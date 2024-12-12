const Joi = require('joi');
const { getAllArtikelsHandler, updateArtikelHandler, addArtikelHandler, postPredictHandler } = require('./handler');

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
        options: {
            payload: {
                output: 'stream',
                parse: true,
                multipart: true, // Untuk file upload
            },
        },
    },
    {
        method: 'POST',
        path: '/artikels',
        handler: addArtikelHandler,
        options: {
            payload: {
                output: 'stream',
                parse: true,
                multipart: true, // Untuk file upload
            },
        },
    },
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
          payload: {
            allow: 'multipart/form-data',
            multipart: true,
            // maxBytes: 1000000
          }
        }
    },
];

module.exports = routes;
