import axios from 'axios';

// Jikan API configuration
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

class AnimeAPI {
  static async getTopAnime(limit = 25) {
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/top/anime`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top anime:', error);
      throw error;
    }
  }

  static async getCurrentSeasonAnime() {
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/seasons/now`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current season anime:', error);
      throw error;
    }
  }

  static async getAnimeById(id) {
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/anime/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching anime by ID:', error);
      throw error;
    }
  }

  static async searchAnime(query, limit = 25) {
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/anime`, {
        params: { q: query, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  }

  static async getAnimeSchedule(day) {
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/schedules`, {
        params: day ? { filter: day } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching anime schedule:', error);
      throw error;
    }
  }

  static async getAnimeCharacters(id) {
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/anime/${id}/characters`);
      return response.data;
    } catch (error) {
      console.error('Error fetching anime characters:', error);
      throw error;
    }
  }

  static async getAnimeVideos(id) {
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/anime/${id}/videos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching anime videos:', error);
      throw error;
    }
  }
}

export default AnimeAPI;

