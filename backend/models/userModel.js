const db = require('../config/db');

const User = {
    async create(name, email, password) {
        const query = 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
        const [result] = await db.execute(query, [name, email, password]);
        return result.insertId;
    },

    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    },

    async findAll() {
        const query = 'SELECT id, name, email, role, created_at FROM users';
        const [rows] = await db.execute(query);
        return rows;
    },

    async update(id, name, email) {
        const query = 'UPDATE users SET name = ?, email = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [name, email, id]);
        return result.affectedRows;
    },

    async delete(id) {
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows;
    }
};

module.exports = User;