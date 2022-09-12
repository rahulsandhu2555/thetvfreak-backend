const sql = require("../db");
const dbConfig = require('../dbConfig');
// constructor
const PostMeta = function (post) {
    this.post_id =post.post_id,
    this.meta_key = '_thumbnail_id',
    this.meta_value = post.meta_value
};
PostMeta.createPostMeta = (newPost, result) => {
    sql.query("INSERT INTO postmeta SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Post: ", {id: res.insertId, ...newPost});
        result(null, {id: res.insertId, ...newPost});
    });
};
module.exports = PostMeta;