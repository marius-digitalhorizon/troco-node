const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const logRoutes = require('./routes/logRoutes');
const dryingProcessRoutes = require('./routes/dryingProcessRoutes');

dotenv.config();
(async () => {
  await connectDB();
})();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const rateLimit = require('express-rate-limit');

// Globale Rate Limiting-Konfiguration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100, // Maximal 100 Anfragen pro IP
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes',
    },
});

// Limiter für alle Routen aktivieren
app.use(limiter);

const logger = require('./config/logger');

// Beispiel-Logging in der App
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Fehler-Logging
app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});


app.get('/', (req, res) => {
  res.send('Drying Company Backend API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/processes', dryingProcessRoutes);

module.exports = app;
