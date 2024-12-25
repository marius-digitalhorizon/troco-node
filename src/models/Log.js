const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    processId: { type: mongoose.Schema.Types.ObjectId, ref: 'DryingProcess', required: true },
    severity: {
        type: String,
        enum: ['info', 'warning', 'error'],
        default: 'info',
    },
    values: {
        temperature: { type: Number, default: null },
        humidity: { type: Number, default: null },
        voltage: { type: Number, default: 0 },
        amperage: { type: Number, default: 0 },
        power: { type: Number, default: 0 },
    },
    message: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
