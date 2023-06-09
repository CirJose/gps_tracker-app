const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const userOwnerController = require('../controllers/userOwnerController');

router.route('/delete').post([authenticateJWT, restrictedRoute], (req, res) => { userOwnerController.delete(req, res) });
router.route('/update').post([authenticateJWT, restrictedRoute], (req, res) => { userOwnerController.update(req, res) });
router.route('/create').post([authenticateJWT, restrictedRoute], (req, res) => { userOwnerController.create(req, res) });
router.route('/list').post([authenticateJWT], (req, res) => { userOwnerController.list(req, res) });
router.route('/find').post([authenticateJWT, restrictedRoute], (req, res) => { userOwnerController.find(req, res) });

module.exports = router;
