import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter        from './router/userRouter.js';
import doctorRouter      from './router/doctorRouter.js';
import appointmentRouter from './router/appointmentRouter.js';
import adminRouter       from './router/adminRouter.js';

dotenv.config();

const app       = express();
const PORT      = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

/* Resolve __dirname in ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.use(cors());
app.use(express.json());

/* Serve uploaded PDFs as static files */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ── Routes ── */
app.use('/api',              userRouter);
app.use('/api/doctors',      doctorRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/admin',        adminRouter);

/* ── Health check ── */
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));