const router = require('express').Router();
const { authenticateJWT } = require('../_util/ProtectedRoute');
const ibeaconController = require('../controllers/ibeaconController');

// router.route('/').post(authenticateJWT, (req, res) => { gprsController.event(req, res) });
router.route('/').post((req, res) => { ibeaconController.event(req, res) });
//router.route('/sse/:id').get( (req, res) => { gprsController.eventPublisher(req, res) });
//router.route('/sse/:id').get(authenticateJWT, (req, res) => { gprsController.eventPublisher(req, res) });

module.exports = router;
