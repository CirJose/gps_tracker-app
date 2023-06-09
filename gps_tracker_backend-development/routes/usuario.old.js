const router = require('express').Router();
const {authenticateJWT} = require('../_util/ProtectedRoute');
const {find,
    findUsuario,
    createUsuario,
    updateUsuario,
    uploadUsuarioHandler,
    actualizarDatosUsuario} = require('../controllers/UsuarioController');

const {singleMulter} = require('../_util/MulterHelper');
const {verifyMailUsuario} = require('../controllers/ValidAccountController');

router.route('/update/dato_usuario').post([authenticateJWT,singleMulter],(req, res) => {actualizarDatosUsuario(req,res)});
router.route('/find').post(authenticateJWT,(req, res) => {find(req,res)});
router.route('/findUsuario').post(authenticateJWT,(req, res) => {findUsuario(req,res)});
router.route('/createUsuario').post([authenticateJWT,uploadUsuarioHandler],(req, res) => {createUsuario(req,res)});
router.route('/updateUsuario').post([authenticateJWT,uploadUsuarioHandler,verifyMailUsuario],(req, res) => {updateUsuario(req,res)});


module.exports = router;
