const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const roleController = require('../controllers/roleController');

router.route('/delete').post([authenticateJWT, restrictedRoute], (req, res) => { roleController.delete(req, res) });
router.route('/update').post([authenticateJWT, restrictedRoute], (req, res) => { roleController.update(req, res) });
router.route('/create').post([authenticateJWT, restrictedRoute], (req, res) => { roleController.create(req, res) });
router.route('/list').post([authenticateJWT, restrictedRoute], (req, res) => { roleController.list(req, res) });
router.route('/find').post([authenticateJWT, restrictedRoute], (req, res) => { roleController.find(req, res) });

module.exports = router;
