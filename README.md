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
   ```bash
   npm run seed
   ```

5. **Fire it up!**
   ```bash
   npm run dev
   ```

The frontend will pop up at `http://localhost:5173`. Backend runs on port 5000.

## Demo Users

If you seeded the database, you can log in with any of these:
- alice@synctalk.dev / password123
- bob@synctalk.dev / password123
- carol@synctalk.dev / password123
- dave@synctalk.dev / password123

Hit me up if you run into any issues running it locally!
