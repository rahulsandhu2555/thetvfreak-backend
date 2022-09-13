const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:3000",

};
app.use(cors());

const port = 3002;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

require("../backend/posts.routes.js")(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
