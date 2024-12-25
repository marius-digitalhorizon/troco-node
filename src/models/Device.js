const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceName: { type: String, required: true },
    status: {
        type: String,
        enum: ['warehouse', 'running', 'stopped', 'autoStopped', 'error', 'outOfService'],
        default: 'warehouse',
    },
    firmware: { type: String, default: '' },
    pcbVersion: { type: String, required: true },
    apiKey: { type: String, required: true, unique: true },
    lastHeartbeat: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);
