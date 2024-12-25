const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    salutation: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'customer', 'insurance', 'administration'],
        default: 'customer',
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Passwort-Hashing vor dem Speichern
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Nur hashen, wenn Passwort geändert wurde
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Methode zur Validierung von Passwörtern
userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
