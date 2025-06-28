import Admin from '../models/Admin.js';
import News from '../models/News.js';
import Comment from '../models/Comment.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

class AdminController {
  static async loginPage(req, res) {
    if (req.session.admin) {
      return res.redirect('/admin/dashboard');
    }
    
    res.render('admin/login', {
      title: 'Admin Login - AnimeHub',
      error: null
    });
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      
      const admin = await Admin.authenticate(username, password);
      
      if (admin) {
        req.session.admin = admin;
        res.redirect('/admin/dashboard');
      } else {
        res.render('admin/login', {
          title: 'Admin Login - AnimeHub',
          error: 'Invalid username or password'
        });
      }
    } catch (error) {
      console.error('Error in AdminController.login:', error);
      res.render('admin/login', {
        title: 'Admin Login - AnimeHub',
        error: 'Login failed. Please try again.'
      });
    }
  }

  static async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/admin/login');
    });
  }

  static async dashboard(req, res) {
    try {
      const allNews = await News.getAll();
      const recentComments = await Comment.getRecent(10);
      
      res.render('admin/dashboard', {
        title: 'Admin Dashboard - AnimeHub',
        admin: req.session.admin,
        news: allNews,
        recentComments: recentComments
      });
    } catch (error) {
      console.error('Error in AdminController.dashboard:', error);
      res.render('admin/dashboard', {
        title: 'Admin Dashboard - AnimeHub',
        admin: req.session.admin,
        news: [],
        recentComments: [],
        error: 'Failed to load dashboard data'
      });
    }
  }

  static async createNewsPage(req, res) {
    res.render('admin/create-news', {
      title: 'Create News - AnimeHub',
      admin: req.session.admin
    });
  }

  static async createNews(req, res) {
    try {
      const { title, content } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      
      await News.create(title, content, imageUrl);
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error('Error in AdminController.createNews:', error);
      res.render('admin/create-news', {
        title: 'Create News - AnimeHub',
        admin: req.session.admin,
        error: 'Failed to create news'
      });
    }
  }

  static async editNewsPage(req, res) {
    try {
      const { id } = req.params;
      const news = await News.getById(id);
      
      if (!news) {
        return res.status(404).render('404', {
          title: 'News Not Found - AnimeHub'
        });
      }
      
      res.render('admin/edit-news', {
        title: 'Edit News - AnimeHub',
        admin: req.session.admin,
        news: news
      });
    } catch (error) {
      console.error('Error in AdminController.editNewsPage:', error);
      res.status(404).render('404', {
        title: 'News Not Found - AnimeHub'
      });
    }
  }

  static async editNews(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      
      await News.update(id, title, content, imageUrl);
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error('Error in AdminController.editNews:', error);
      res.redirect('/admin/dashboard');
    }
  }

  static async deleteNews(req, res) {
    try {
      const { id } = req.params;
      await News.delete(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error in AdminController.deleteNews:', error);
      res.status(500).json({ error: 'Failed to delete news' });
    }
  }

  static async deleteComment(req, res) {
    try {
      const { id } = req.params;
      await Comment.delete(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error in AdminController.deleteComment:', error);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  }
}

// Middleware to check admin authentication
export const requireAdmin = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

export default AdminController;

