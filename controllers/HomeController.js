import AnimeAPI from '../config/animeAPI.js';
import News from '../models/News.js';

class HomeController {
  static async index(req, res) {
    try {
      // Get popular anime
      const topAnimeData = await AnimeAPI.getTopAnime(12);
      const currentSeasonData = await AnimeAPI.getCurrentSeasonAnime();
      
      // Get recent news
      const recentNews = await News.getRecent(5);

      res.render('home/index', {
        title: 'AnimeHub - Your Anime Information Portal',
        topAnime: topAnimeData.data || [],
        currentSeason: currentSeasonData.data || [],
        recentNews: recentNews || [],
        user: req.session.user || null
      });
    } catch (error) {
      console.error('Error in HomeController.index:', error);
      res.render('home/index', {
        title: 'AnimeHub - Your Anime Information Portal',
        topAnime: [],
        currentSeason: [],
        recentNews: [],
        user: req.session.user || null,
        error: 'Failed to load anime data'
      });
    }
  }

  static async search(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.render('home/search', {
          title: 'Search Anime - AnimeHub',
          query: '',
          results: [],
          user: req.session.user || null
        });
      }

      const searchResults = await AnimeAPI.searchAnime(q, 20);

      res.render('home/search', {
        title: `Search Results for "${q}" - AnimeHub`,
        query: q,
        results: searchResults.data || [],
        user: req.session.user || null
      });
    } catch (error) {
      console.error('Error in HomeController.search:', error);
      res.render('home/search', {
        title: 'Search Anime - AnimeHub',
        query: req.query.q || '',
        results: [],
        user: req.session.user || null,
        error: 'Failed to search anime'
      });
    }
  }
}

export default HomeController;

