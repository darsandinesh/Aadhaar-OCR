import express from 'express';
import upload from '../utils/multer';
import ocrController from '../controller/ocrController';
const router = express.Router();

router.post('/', upload.fields([{ name: 'frontImage' }, { name: 'backImage' }]), ocrController);

export default router