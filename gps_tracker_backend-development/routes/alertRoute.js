const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const alertController = require('../controllers/alertController');

router.route('/historial').post([authenticateJWT, restrictedRoute], (req, res) => { alertController.findByDates(req, res) });
router.route('/fuga').post([authenticateJWT, restrictedRoute], (req, res) => { alertController.beaconFugaAlert(req, res) });
router.route('/agrupacion').post([authenticateJWT, restrictedRoute], (req, res) => { alertController.beaconAgrupacionAlert(req, res) });

module.exports = router;