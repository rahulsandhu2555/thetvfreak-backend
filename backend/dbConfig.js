// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ttf',
    password: 'Rahul12#',
    database: 'ttf'
});
module.exports = connection


// // with placeholder
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45],
//     function(err, results) {
//         console.log(results);
//     }
// );