'use strict';

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const client = require('prom-client');

const healthRouter = require('./routes/health');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Security middleware ────────────────────────────────────────
app.use(helmet());                    // Sets secure HTTP headers
app.use(express.json({ limit: '1mb' }));  // Parse JSON (size-limited)

// ── Logging ───────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// ── Prometheus default metrics ─────────────────────────────────
client.collectDefaultMetrics({ register: client.register });

// ── Routes ────────────────────────────────────────────────────
app.use('/health', healthRouter);
app.use('/api', apiRouter);

// Metrics endpoint (Prometheus scrape target)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// ── Error handlers ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.warn(`[app] Server listening on port ${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
  });
}

module.exports = app;
