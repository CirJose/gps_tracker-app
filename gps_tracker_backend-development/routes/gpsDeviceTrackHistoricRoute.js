const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const gpsDeviceTrackController = require('../controllers/gpsDeviceTrackController');

router.route('/historial').post([authenticateJWT, restrictedRoute], (req, res) => { gpsDeviceTrackController.findByDates(req, res) });
router.route('/details').post([authenticateJWT, restrictedRoute], (req, res) => { gpsDeviceTrackController.findDetailByDates(req, res) });
router.route('/route').post([authenticateJWT, restrictedRoute], (req, res) => { gpsDeviceTrackController.findRouteByDates(req, res) });

module.exports = router;
