import { db } from '../config/database.js';

class News {
  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM news ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM news WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async create(title, content, imageUrl = null) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)');
      stmt.run([title, content, imageUrl], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, title, content, imageUrl });
      });
      stmt.finalize();
    });
  }

  static async update(id, title, content, imageUrl = null) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('UPDATE news SET title = ?, content = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
      stmt.run([title, content, imageUrl, id], function(err) {
        if (err) reject(err);
        else resolve({ id, title, content, imageUrl });
      });
      stmt.finalize();
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM news WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ deletedId: id });
      });
    });
  }

  static async getRecent(limit = 5) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM news ORDER BY created_at DESC LIMIT ?', [limit], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

export default News;

