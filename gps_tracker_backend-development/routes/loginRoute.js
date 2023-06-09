const router = require('express').Router();
const loginController = require('../controllers/loginController');
const { authenticateJWT } = require('../_util/ProtectedRoute');
// const {verifyMailRegistro} = require('../controllers/ValidAccountController');

router.route('/login').post((req, res) => { loginController.accessToken(req, res) });
router.route('/refresh').post((req, res) => { loginController.refreshToken(req, res) });
// router.route('/register').post(verifyMailRegistro,(req, res) => { loginController.register(req, res) });

// router.route('/change_password').post(authenticateJWT, (req, res) => { loginController.actualizarPasswordUsuario(req, res) });
router.route('/introspect').post(authenticateJWT, (req, res) => { loginController.consultaIntrospect(req, res) })

module.exports = router;
