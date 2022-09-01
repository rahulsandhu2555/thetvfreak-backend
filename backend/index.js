const express = require("express");
const {connection} = require("./dbConfig");

const app = express();
const port = 3000;
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});
app.get("/posts", (req, res) => {
    let response;
    connection.query(
        'SELECT * FROM `posts`',
        function(err, results, fields) {
            response = results
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
    res.json({ message: "ok", post: response });
});

app.listen(port, () => {
    console.log(`Example app listeningg at http://localhost:${port}`);
});
