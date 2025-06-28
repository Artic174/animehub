import express from 'express';
import AnimeController from '../controllers/AnimeController.js';

const router = express.Router();

router.get('/schedule', AnimeController.schedule);
router.get('/:id', AnimeController.detail);
router.post('/:id/comments', AnimeController.addComment);
router.get('/:id/comments', AnimeController.getComments);

export default router;

