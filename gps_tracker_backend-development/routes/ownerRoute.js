const router = require('express').Router();
const { authenticateJWT, restrictedRoute } = require('../_util/ProtectedRoute');
const ownerController = require('../controllers/ownerController');

router.route('/delete').post([authenticateJWT, restrictedRoute], (req, res) => { ownerController.delete(req, res) });
router.route('/update').post([authenticateJWT, restrictedRoute], (req, res) => { ownerController.update(req, res) });
router.route('/create').post([authenticateJWT, restrictedRoute], (req, res) => { ownerController.create(req, res) });
router.route('/list').post([authenticateJWT, restrictedRoute], (req, res) => { ownerController.list(req, res) });
router.route('/find').post([authenticateJWT, restrictedRoute], (req, res) => { ownerController.find(req, res) });

module.exports = router;
