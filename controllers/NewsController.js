import News from '../models/News.js';

class NewsController {
  static async index(req, res) {
    try {
      const allNews = await News.getAll();
      
      res.render('news/index', {
        title: 'Anime News - AnimeHub',
        news: allNews,
        user: req.session.user || null
      });
    } catch (error) {
      console.error('Error in NewsController.index:', error);
      res.render('news/index', {
        title: 'Anime News - AnimeHub',
        news: [],
        user: req.session.user || null,
        error: 'Failed to load news'
      });
    }
  }

  static async detail(req, res) {
    try {
      const { id } = req.params;
      const news = await News.getById(id);

      if (!news) {
        return res.status(404).render('404', {
          title: 'News Not Found - AnimeHub',
          user: req.session.user || null
        });
      }

      res.render('news/detail', {
        title: `${news.title} - AnimeHub`,
        news: news,
        user: req.session.user || null
      });
    } catch (error) {
      console.error('Error in NewsController.detail:', error);
      res.status(404).render('404', {
        title: 'News Not Found - AnimeHub',
        user: req.session.user || null
      });
    }
  }
}

export default NewsController;

