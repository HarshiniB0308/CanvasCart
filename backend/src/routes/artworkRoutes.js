import express from 'express';
import {
  getArtworks,
  getArtworkById,
  createArtwork,
  moderateArtwork,
  enhanceArtwork,
  getAllArtworks,
} from '../controllers/artworkController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getArtworks);
router.get('/admin', protect, authorize('Admin'), getAllArtworks);
router.get('/:id', getArtworkById);
router.post('/', protect, createArtwork);
router.post('/:id/enhance', protect, enhanceArtwork);
router.put('/:id/moderate', protect, authorize('Admin'), moderateArtwork);

export default router;
