const mysql = require('mysql2/promise');

const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
})

modele.exports = db;