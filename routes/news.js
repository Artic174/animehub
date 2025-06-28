import express from 'express';
import NewsController from '../controllers/NewsController.js';

const router = express.Router();

router.get('/', NewsController.index);
router.get('/:id', NewsController.detail);

export default router;

