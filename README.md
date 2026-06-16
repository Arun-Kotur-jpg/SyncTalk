# SyncTalk

SyncTalk is a secure real-time communication platform for software project teams, featuring AI message summarization and voice message transcription. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Setup Instructions

1. **Install Dependencies**
   Run the following from the root directory to install dependencies for the root, server, and client:
   ```bash
   npm run install-all
   ```

2. **Database Setup**
   Make sure you have MongoDB running locally on port 27017. If you are using MongoDB Atlas, update the `MONGODB_URI` inside `server/.env` with your connection string.

3. **Environment Variables**
   The `.env` files for the client and server have been pre-configured for local development.
   If you want to use the AI Summarization and Voice-to-Text Transcription features, add your OpenAI API key to `server/.env`:
   ```env
   OPENAI_API_KEY=your-actual-api-key
   ```
   *Note: If no API key is provided, the application will gracefully fall back to basic extractive summarization and display a placeholder for voice transcriptions.*

4. **Seed the Database**
   To populate the application with a demo team and messages:
   ```bash
   npm run seed
   ```

5. **Start the Application**
   Run the following command from the root directory to start both the Node.js server and Vite client concurrently:
   ```bash
   npm start
   ```

The frontend will be available at [http://localhost:5173](http://localhost:5173).
The backend API runs on `http://localhost:5000`.

### Demo Accounts
- alice@synctalk.dev / password123
- bob@synctalk.dev / password123
- carol@synctalk.dev / password123
- dave@synctalk.dev / password123
