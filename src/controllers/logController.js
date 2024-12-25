const Log = require('../models/Log');

// Log hinzufügen
const createLog = async (req, res) => {
    try {
        const log = await Log.create(req.body);
        res.status(201).json({ success: true, data: log });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Logs abrufen
const getLogs = async (req, res) => {
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
          Log.countDocuments(query), // Gesamtanzahl für Pagination
          Log.find(query)
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

module.exports = { createLog, getLogs };
