const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const smsController = require('../controllers/smsController');

router.route('/status').post([authenticateJWT, restrictedRoute], (req, res) => { smsController.checkStatus(req, res) });
router.route('/apn').post([authenticateJWT, restrictedRoute], (req, res) => { smsController.apn(req, res) });
router.route('/apn_user').post([authenticateJWT, restrictedRoute], (req, res) => { smsController.apn_user(req, res) });
router.route('/apn_pass').post([authenticateJWT, restrictedRoute], (req, res) => { smsController.apn_pass(req, res) });
router.route('/set_ip').post([authenticateJWT, restrictedRoute], (req, res) => { smsController.setip(req, res) });
router.route('/freq').post([authenticateJWT, restrictedRoute], (req, res) => { smsController.freq(req, res) });
router.route('/gprs').post([authenticateJWT, restrictedRoute], (req, res) => { smsController.gprs(req, res) });
router.route('/fix').post([authenticateJWT, restrictedRoute], (req, res) => { smsController.fix(req, res) });

module.exports = router;
