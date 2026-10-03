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
    }
};

module.exports = User;