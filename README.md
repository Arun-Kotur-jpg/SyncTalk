<<<<<<< HEAD
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
=======
# SyncTalk 

Hey! Welcome to SyncTalk. I built this project to solve a problem my team was having with keeping track of scattered conversations. It's a real-time team chat application with a twist: it uses AI to automatically summarize long discussions and transcribe voice notes so you don't have to listen to a 5-minute ramble.

I built this using the MERN stack (MongoDB, Express, React, Node) and it's structured as an NPM workspace.

## Quick Start

1. **Install everything**
   Just run `npm install` from the root. Thanks to NPM workspaces, this will pull down dependencies for both the client and server.

2. **Database setup**
   Make sure MongoDB is running on port 27017, or just drop your Atlas URI into `server/.env`.

3. **API Keys (Optional but recommended)**
   If you want the AI summaries to actually work, grab an OpenAI API key and toss it into `server/.env`:
   ```env
   OPENAI_API_KEY=your_key_here
   ```
   *Note: If you don't add this, the app won't crash, it just falls back to a super basic extractive summary and skips the voice transcriptions.*

4. **Populate some fake data**
   Want to see it in action without creating 5 accounts yourself? Run:
>>>>>>> friend/main
   ```bash
   npm run seed
   ```

<<<<<<< HEAD
5. **Start the Application**
   Run the following command from the root directory to start both the Node.js server and Vite client concurrently:
   ```bash
   npm start
   ```

The frontend will be available at [http://localhost:5173](http://localhost:5173).
The backend API runs on `http://localhost:5000`.

### Demo Accounts
=======
5. **Fire it up!**
   ```bash
   npm run dev
   ```

The frontend will pop up at `http://localhost:5173`. Backend runs on port 5000.

## Demo Users

If you seeded the database, you can log in with any of these:
>>>>>>> friend/main
- alice@synctalk.dev / password123
- bob@synctalk.dev / password123
- carol@synctalk.dev / password123
- dave@synctalk.dev / password123
<<<<<<< HEAD
=======

Hit me up if you run into any issues running it locally!
>>>>>>> friend/main
