const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

const  upImagesProducts =require('../middlewares/upImagesProducts')

router.get('/',productsController.listar);
router.get('/detalle/:id',productsController.detalle);
router.get('/search',productsController.search);

// no pasa nada que sea la misma ruta ya que no van por el mismo metodo
router.get('/add', productsController.agregar)
router.get('/add/form', productsController.agregar)
router.post('/add/form',upImagesProducts.any(), productsController.publicar)
router.get('/show/:id/:flap?', productsController.show)

router.put('/edit/:id', upImagesProducts.any(),productsController.editar)


module.exports= router;
