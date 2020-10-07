var express = require('express');
var router = express.Router();

const usersController= require('../controllers/usersControllers')
const upImagesUsers =require('../middlewares/upImagesUsers')

/* GET users listing. */
router.get('/register',usersController.register)
router.post('/register',upImagesUsers.any(),usersController.processRegister)
router.get('/login', usersController.login)
router.post('/login',usersController.processLogin);

router.get('/profile',usersController.profile);

module.exports = router;
