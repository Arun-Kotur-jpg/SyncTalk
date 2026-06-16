import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

/**
 * Transcribe an audio file to text.
 * Uses Gemini 1.5 Flash if available, otherwise returns a placeholder.
 *
 * @param {string} filePath - Absolute path to the audio file
 * @returns {Promise<string>} Transcribed text
 */
export const transcribeAudio = async (filePath) => {
  const genAI = getClient();

  if (!genAI) {
    // Fallback: return a placeholder when no API key
    return '[Transcription unavailable — configure GEMINI_API_KEY for voice-to-text]';
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    
    // Read audio file as base64
    const audioData = fs.readFileSync(filePath);
    const audioBase64 = audioData.toString("base64");

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "audio/webm", // Multer saves voice uploads as webm
          data: audioBase64
        }
      },
      { text: "Please transcribe this audio exactly as it is spoken. Do not add any extra text, markdown, or comments." },
    ]);

    return result.response.text().trim();
  } catch (error) {
    console.error('Gemini transcription error:', error.message);
    throw new Error('Voice transcription failed. Please try again.');
  }
};
