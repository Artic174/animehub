import { db } from '../config/database.js';
import bcrypt from 'bcryptjs';

class Admin {
  static async authenticate(username, password) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM admins WHERE username = ?', [username], async (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          const isValid = await bcrypt.compare(password, row.password);
          if (isValid) {
            resolve({ id: row.id, username: row.username });
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }

  static async create(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)');
        stmt.run([username, hashedPassword], function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, username });
        });
        stmt.finalize();
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, username, created_at FROM admins WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async updatePassword(id, newPassword) {
    return new Promise(async (resolve, reject) => {
      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.run('UPDATE admins SET password = ? WHERE id = ?', [hashedPassword, id], function(err) {
          if (err) reject(err);
          else resolve({ success: true });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Admin;

