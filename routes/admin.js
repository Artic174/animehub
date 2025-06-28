import express from 'express';
import AdminController, { requireAdmin, upload } from '../controllers/AdminController.js';

const router = express.Router();

// Public routes
router.get('/login', AdminController.loginPage);
router.post('/login', AdminController.login);
router.post('/logout', AdminController.logout);

// Protected routes
router.get('/dashboard', requireAdmin, AdminController.dashboard);
router.get('/news/create', requireAdmin, AdminController.createNewsPage);
router.post('/news/create', requireAdmin, upload.single('image'), AdminController.createNews);
router.get('/news/:id/edit', requireAdmin, AdminController.editNewsPage);
router.post('/news/:id/edit', requireAdmin, upload.single('image'), AdminController.editNews);
router.delete('/news/:id', requireAdmin, AdminController.deleteNews);
router.delete('/comments/:id', requireAdmin, AdminController.deleteComment);

export default router;

