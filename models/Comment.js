import { db } from '../config/database.js';

class Comment {
  static async getByAnimeId(animeId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM comments WHERE anime_id = ? ORDER BY created_at DESC', [animeId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async create(animeId, username, comment) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO comments (anime_id, username, comment) VALUES (?, ?, ?)');
      stmt.run([animeId, username, comment], function(err) {
        if (err) reject(err);
        else resolve({ 
          id: this.lastID, 
          anime_id: animeId, 
          username, 
          comment,
          created_at: new Date().toISOString()
        });
      });
      stmt.finalize();
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM comments WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ deletedId: id });
      });
    });
  }

  static async getRecent(limit = 10) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM comments ORDER BY created_at DESC LIMIT ?', [limit], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

export default Comment;

