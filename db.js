const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "students",
    password: "12345",
    port: 5432
});

// pool.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

module.exports = pool;