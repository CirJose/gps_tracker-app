const router = require('express').Router();
const { authenticateJWT } = require('../_util/ProtectedRoute');
const ibeaconController = require('../controllers/ibeaconController');

// router.route('/:id').get(authenticateJWT, (req, res) => { gprsController.eventPublisher(req, res) });
router.route('/').get( (req, res) => { ibeaconController.eventPublisher(req, res) });

module.exports = router;
