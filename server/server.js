import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectDB from './config/db.js';
import setupSocket from './socket/socketHandler.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure uploads directory exists
const voiceDir = path.join(__dirname, 'uploads', 'voice');
if (!fs.existsSync(voiceDir)) {
  fs.mkdirSync(voiceDir, { recursive: true });
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Create HTTP server
  const httpServer = createServer(app);

  // Setup Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
  });

  setupSocket(io);

  // Make io available to routes if needed
  app.set('io', io);

  httpServer.listen(PORT, () => {
    console.log(`\n🚀 SyncTalk server running on port ${PORT}`);
    console.log(`   API: http://localhost:${PORT}/api`);
    console.log(`   WebSocket: ws://localhost:${PORT}\n`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
