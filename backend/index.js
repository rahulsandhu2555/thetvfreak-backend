const express = require("express");
const {connection} = require("./dbConfig");
const db = require("./db");

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
app.get("/posts", async (req, res) => {
    try{
        const rows = await db.query(
            'SELECT * FROM `posts`'
        );
    }
    catch (e) {
        res.json({ message: "ok", post: e.message });
    }
    res.json({ message: "ok", post: rows });
});

app.listen(port, () => {
    console.log(`Example app listeningg at http://localhost:${port}`);
});
