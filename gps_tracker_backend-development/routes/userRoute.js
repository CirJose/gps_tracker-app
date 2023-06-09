const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const userController = require('../controllers/userController');

router.route('/delete').post([authenticateJWT, restrictedRoute], (req, res) => { userController.delete(req, res) });
router.route('/update').post([authenticateJWT, restrictedRoute], (req, res) => { userController.update(req, res) });
router.route('/create').post([authenticateJWT, restrictedRoute], (req, res) => { userController.create(req, res) });
router.route('/list').post([authenticateJWT, restrictedRoute], (req, res) => { userController.list(req, res) });
router.route('/find').post([authenticateJWT, restrictedRoute], (req, res) => { userController.find(req, res) });

module.exports = router;
