const mysql = require("mysql2");
const dbConfig = require("./dbConfig");
// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.db.host,
    user: dbConfig.db.user,
    password: dbConfig.db.password,
    database: dbConfig.db.database
});
// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});
module.exports = connection;