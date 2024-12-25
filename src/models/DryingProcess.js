const mongoose = require('mongoose');

const dryingProcessSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectName: { type: String, required: true },
    insurance: {
        insuranceCase: { type: Boolean, default: false },
        insuranceCertificateNumber: { type: String, default: '' },
        insuranceClaimNumber: { type: String, default: '' },
        contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    },
    administration: {
        contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    },
    projectManager: {
        contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    status: {
        type: String,
        enum: ['planned', 'active', 'completed', 'cancelled'],
        default: 'active',
    },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
    logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
}, { timestamps: true });

module.exports = mongoose.model('DryingProcess', dryingProcessSchema);
