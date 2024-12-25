const express = require('express');
const { createProcess, getProcesses, getProcessById, updateProcess, deleteProcess } = require('../controllers/dryingProcessController');
const router = express.Router();

router.post('/', createProcess); // Prozess erstellen
router.get('/', getProcesses); // Alle Prozesse abrufen
router.get('/:id', getProcessById); // Details eines Prozesses abrufen
router.patch('/:id', updateProcess); // Prozess aktualisieren
router.delete('/:id', deleteProcess); // Prozess löschen

module.exports = router;
