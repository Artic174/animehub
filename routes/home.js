import express from 'express';
import HomeController from '../controllers/HomeController.js';

const router = express.Router();

router.get('/', HomeController.index);
router.get('/search', HomeController.search);

export default router;

