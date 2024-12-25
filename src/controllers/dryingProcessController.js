const DryingProcess = require('../models/DryingProcess');

// Trocknungsprozess erstellen
const createProcess = async (req, res) => {
    try {
        const process = await DryingProcess.create(req.body);
        res.status(201).json({ success: true, data: process });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Alle Trocknungsprozesse abrufen
const getProcesses = async (req, res) => {
  const { page = 1, limit = 10, ...filters } = req.query;

  try {
      // Filterung vorbereiten
      const query = {};
      for (const key in filters) {
          query[key] = new RegExp(filters[key], 'i'); // Teilweise Übereinstimmung (case-insensitive)
      }

      // Pagination berechnen
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Gesamtanzahl und gefilterte Ergebnisse abrufen
      const [total, results] = await Promise.all([
          DryingProcess.countDocuments(query), // Gesamtanzahl für Pagination
          DryingProcess.find(query)
              .populate('customer devices logs') // Verknüpfte Daten abrufen
              .populate('insurance.contactPerson administration.contactPerson projectManager.contactPerson')
              .skip(skip) // Ergebnisse überspringen
              .limit(parseInt(limit)) // Begrenzte Anzahl von Ergebnissen abrufen
              .exec(), // Abfrage ausführen
      ]);

      res.status(200).json({
          success: true,
          data: {
              total,
              page: parseInt(page),
              limit: parseInt(limit),
              results,
          },
      });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

// Details eines Trocknungsprozesses abrufen
const getProcessById = async (req, res) => {
    try {
        const process = await DryingProcess.findById(req.params.id)
            .populate('customer devices logs')
            .populate('insurance.contactPerson administration.contactPerson projectManager.contactPerson');
        if (!process) return res.status(404).json({ success: false, message: 'Process not found' });

        res.status(200).json({ success: true, data: process });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Trocknungsprozess aktualisieren
const updateProcess = async (req, res) => {
    try {
        const process = await DryingProcess.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!process) return res.status(404).json({ success: false, message: 'Process not found' });

        res.status(200).json({ success: true, data: process });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Trocknungsprozess löschen
const deleteProcess = async (req, res) => {
    try {
        const process = await DryingProcess.findByIdAndDelete(req.params.id);
        if (!process) return res.status(404).json({ success: false, message: 'Process not found' });

        res.status(200).json({ success: true, message: 'Process deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createProcess, getProcesses, getProcessById, updateProcess, deleteProcess };
