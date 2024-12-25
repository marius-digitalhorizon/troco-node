const Device = require('../models/Device');

// Gerät hinzufügen
const createDevice = async (req, res) => {
    try {
        const device = await Device.create(req.body);
        res.status(201).json({ success: true, data: device });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Alle Geräte abrufen
const getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json({ success: true, data: devices });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Gerätdetails abrufen
const getDeviceById = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

        res.status(200).json({ success: true, data: device });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Gerät aktualisieren
const updateDevice = async (req, res) => {
    try {
        const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

        res.status(200).json({ success: true, data: device });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Gerät löschen
const deleteDevice = async (req, res) => {
    try {
        const device = await Device.findByIdAndDelete(req.params.id);
        if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

        res.status(200).json({ success: true, message: 'Device deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createDevice, getDevices, getDeviceById, updateDevice, deleteDevice };
