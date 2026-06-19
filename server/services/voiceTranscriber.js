import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

/**
 * Detect MIME type from file extension
 */
const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    '.webm': 'audio/webm',
    '.ogg': 'audio/ogg',
    '.mp3': 'audio/mpeg',
    '.mp4': 'audio/mp4',
    '.m4a': 'audio/mp4',
    '.wav': 'audio/wav',
    '.mpeg': 'audio/mpeg',
  };
  return mimeMap[ext] || 'audio/webm';
};

/**
 * Transcribe an audio file to text.
 * Tries multiple Gemini models if one is unavailable.
 * Returns a placeholder if no API key is configured.
 *
 * @param {string} filePath - Absolute path to the audio file
 * @returns {Promise<string>} Transcribed text
 */
export const transcribeAudio = async (filePath) => {
  const ai = getClient();

  if (!ai) {
    // Fallback: return a placeholder when no API key
    return '[Transcription unavailable — configure GEMINI_API_KEY for voice-to-text]';
  }

  // Read audio file as base64
  const audioData = fs.readFileSync(filePath);
  const audioBase64 = audioData.toString("base64");
  const mimeType = getMimeType(filePath);

  console.log(`Transcribing audio: ${filePath} (${mimeType}, ${audioData.length} bytes)`);

  // Try each model in sequence
  for (const modelName of GEMINI_MODELS) {
    try {
      console.log(`Trying transcription with model: ${modelName}`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: audioBase64,
                },
              },
              {
                text: "Transcribe this audio recording exactly as spoken. Output ONLY the spoken words, nothing else. If the audio is unclear or silent, respond with '[inaudible]'.",
              },
            ],
          },
        ],
      });

      const transcription = response?.text?.trim();
      if (transcription) {
        console.log(`Transcription succeeded with model: ${modelName}`);
        return transcription;
      }
    } catch (error) {
      console.warn(`Transcription model ${modelName} failed:`, error.message);
      // Continue to next model
    }
  }

  // All models failed
  throw new Error('Voice transcription failed — all AI models are currently unavailable. Please try again later.');
};
