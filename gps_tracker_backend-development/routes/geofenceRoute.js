const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const geofenceController = require('../controllers/geofenceController');

router.route('/delete').post([authenticateJWT, restrictedRoute], (req, res) => { geofenceController.delete(req, res) });
router.route('/update').post([authenticateJWT, restrictedRoute], (req, res) => { geofenceController.update(req, res) });
router.route('/create').post([authenticateJWT, restrictedRoute], (req, res) => { geofenceController.create(req, res) });
router.route('/list').post([authenticateJWT, restrictedRoute], (req, res) => { geofenceController.list(req, res) });
router.route('/find').post([authenticateJWT, restrictedRoute], (req, res) => { geofenceController.find(req, res) });

module.exports = router;
