import AnimeAPI from '../config/animeAPI.js';
import Comment from '../models/Comment.js';

class AnimeController {
  static async detail(req, res) {
    try {
      const { id } = req.params;
      
      // Get anime details
      const animeData = await AnimeAPI.getAnimeById(id);
      
      // Get anime videos/trailers
      let videosData = null;
      try {
        videosData = await AnimeAPI.getAnimeVideos(id);
      } catch (error) {
        console.log('No videos available for this anime');
      }

      // Get comments for this anime
      const comments = await Comment.getByAnimeId(id);

      res.render('anime/detail', {
        title: `${animeData.data.title} - AnimeHub`,
        anime: animeData.data,
        videos: videosData?.data || null,
        comments: comments || [],
        user: req.session.user || null
      });
    } catch (error) {
      console.error('Error in AnimeController.detail:', error);
      res.status(404).render('404', {
        title: 'Anime Not Found - AnimeHub',
        user: req.session.user || null
      });
    }
  }

  static async schedule(req, res) {
    try {
      const { day } = req.query;
      const scheduleData = await AnimeAPI.getAnimeSchedule(day);

      // Group by day
      const groupedSchedule = {};
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      
      days.forEach(dayName => {
        groupedSchedule[dayName] = scheduleData.data.filter(anime => 
          anime.broadcast?.day?.toLowerCase() === dayName
        );
      });

      res.render('anime/schedule', {
        title: 'Anime Schedule - AnimeHub',
        schedule: groupedSchedule,
        selectedDay: day || 'all',
        user: req.session.user || null
      });
    } catch (error) {
      console.error('Error in AnimeController.schedule:', error);
      res.render('anime/schedule', {
        title: 'Anime Schedule - AnimeHub',
        schedule: {},
        selectedDay: 'all',
        user: req.session.user || null,
        error: 'Failed to load anime schedule'
      });
    }
  }

  static async addComment(req, res) {
    try {
      const { id } = req.params;
      const { username, comment } = req.body;

      if (!username || !comment) {
        return res.status(400).json({ error: 'Username and comment are required' });
      }

      const newComment = await Comment.create(id, username, comment);
      res.json({ success: true, comment: newComment });
    } catch (error) {
      console.error('Error in AnimeController.addComment:', error);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  }

  static async getComments(req, res) {
    try {
      const { id } = req.params;
      const comments = await Comment.getByAnimeId(id);
      res.json({ comments });
    } catch (error) {
      console.error('Error in AnimeController.getComments:', error);
      res.status(500).json({ error: 'Failed to get comments' });
    }
  }
}

export default AnimeController;

