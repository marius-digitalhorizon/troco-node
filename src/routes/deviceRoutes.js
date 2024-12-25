const express = require('express');
const { createDevice, getDevices, getDeviceById, updateDevice, deleteDevice } = require('../controllers/deviceController');
const router = express.Router();
const roleAuthorization = require('../middleware/roleMiddleware');

router.post('/', createDevice); // Gerät hinzufügen
router.get('/', getDevices); // Alle Geräte abrufen
router.get('/:id', getDeviceById); // Gerätdetails abrufen
router.patch('/:id', updateDevice); // Gerät aktualisieren
router.delete('/:id', roleAuthorization(['admin']), deleteDevice); // Gerät löschen

module.exports = router;
