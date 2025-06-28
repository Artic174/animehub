import express from 'express';
import AnimeAPI from '../config/animeAPI.js';

const router = express.Router();

// API endpoints for AJAX requests
router.get('/anime/top', async (req, res) => {
  try {
    const limit = req.query.limit || 25;
    const data = await AnimeAPI.getTopAnime(limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top anime' });
  }
});

router.get('/anime/current-season', async (req, res) => {
  try {
    const data = await AnimeAPI.getCurrentSeasonAnime();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current season anime' });
  }
});

router.get('/anime/search', async (req, res) => {
  try {
    const { q, limit = 25 } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const data = await AnimeAPI.searchAnime(q, limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search anime' });
  }
});

router.get('/anime/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await AnimeAPI.getAnimeById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime details' });
  }
});

router.get('/anime/:id/videos', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await AnimeAPI.getAnimeVideos(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime videos' });
  }
});

router.get('/schedule', async (req, res) => {
  try {
    const { day } = req.query;
    const data = await AnimeAPI.getAnimeSchedule(day);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime schedule' });
  }
});

export default router;

