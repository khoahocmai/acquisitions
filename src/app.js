import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from '#routes/auth.routes.js';
import securityMiddleware from '#middlewares/security.middleware.js';

const app = express();

app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } })); // HTTP request logging

app.use(securityMiddleware); // Custom security middleware

app.get('/', (req, res) => {
  res.status(200).send('Hello from Acquisitions!');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    upTime: process.uptime()
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Acquisitions API'
  });
});

app.use('/api/auth', authRouter); // api/auth routes

export default app;
