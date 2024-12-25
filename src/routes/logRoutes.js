const express = require('express');
const { createLog, getLogs } = require('../controllers/logController');
const router = express.Router();

router.post('/', createLog); // Log hinzufügen
router.get('/', getLogs); // Logs abrufen

module.exports = router;
