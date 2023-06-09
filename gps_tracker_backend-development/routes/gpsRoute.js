const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const gpsController = require('../controllers/gpsController');

router.route('/delete').post([authenticateJWT, restrictedRoute], (req, res) => { gpsController.delete(req, res) });
router.route('/update').post([authenticateJWT, restrictedRoute], (req, res) => { gpsController.update(req, res) });
router.route('/create').post([authenticateJWT, restrictedRoute], (req, res) => { gpsController.create(req, res) });
router.route('/list').post([authenticateJWT, restrictedRoute], (req, res) => { gpsController.list(req, res) });
router.route('/find').post([authenticateJWT, restrictedRoute], (req, res) => { gpsController.find(req, res) });

module.exports = router;
