import { Router } from 'express';
import { upload, uploadVoice, transcribeVoice } from '../controllers/voiceController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/upload', auth, upload.single('audio'), uploadVoice);
router.post('/transcribe/:messageId', auth, transcribeVoice);

export default router;
