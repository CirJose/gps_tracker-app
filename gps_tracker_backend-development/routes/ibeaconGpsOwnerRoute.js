const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const ibeaconGpsOwnerController = require('../controllers/ibeaconGpsOwnerController');

router.route('/delete').post([authenticateJWT, restrictedRoute], (req, res) => { ibeaconGpsOwnerController.delete(req, res) });
router.route('/update').post([authenticateJWT, restrictedRoute], (req, res) => { ibeaconGpsOwnerController.update(req, res) });
router.route('/create').post([authenticateJWT, restrictedRoute], (req, res) => { ibeaconGpsOwnerController.create(req, res) });
router.route('/list').post([authenticateJWT], (req, res) => { ibeaconGpsOwnerController.list(req, res) });
router.route('/find').post([authenticateJWT, restrictedRoute], (req, res) => { ibeaconGpsOwnerController.find(req, res) });

module.exports = router;
