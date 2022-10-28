const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

let corsOptions = {
    origin: "http://localhost:3000",

};
app.use(cors());
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, '../../../static/images'))
const port = 3002;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

require("../backend/posts.routes.js")(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
