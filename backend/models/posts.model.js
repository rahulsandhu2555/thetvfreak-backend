const sql = require("../db");
// constructor
const Post = function(post) {
  this.post_content = post.post_content;
  this.post_title = post.post_title;
  this.post_excerpt = post.post_excerpt;
  this.post_name = post.post_name;
  this.to_ping = post.to_ping;
  this.pinged = post.pinged;
  this.post_content_filtered = post.post_content_filtered;
};
Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};
Post.findById = (id, result) => {
  sql.query(`SELECT * FROM posts WHERE ID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Post with the id
    result({ kind: "not_found" }, null);
  });
};
Post.findBySlug = (slug, result) => {
  sql.query(`SELECT * FROM posts WHERE post_name = '${slug}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found post with the id
    result({ kind: "not_found" }, null);
  });
};
Post.getAll = (title, result) => {
  let query = "SELECT * FROM posts";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("post: ", res);
    result(null, res);
  });
};
Post.getAllPublished = result => {
  sql.query("SELECT * FROM posts WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("posts: ", res);
    result(null, res);
  });
};

Post.updateById = (id, post, result) => {
  sql.query(
      "UPDATE posts SET post_content = ?, post_title = ?, post_name = ?, post_excerpt = ?, post_content_filtered = ? WHERE id = ?",
      [post.post_content, post.post_title, post.post_name, post.post_excerpt, post.post_content_filtered, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found post with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated post: ", { id: id, ...post });
        result(null, { id: id, ...post });
      }
  );
};
Post.updateBySlug = (slug, post, result) => {
  sql.query(
      "UPDATE posts SET post_content = ?, post_title = ?, post_name = ?, post_excerpt = ?, post_content_filtered = ? WHERE post_name = ?",
      [post.post_content, post.post_title, post.post_name, post.post_excerpt, post.post_content_filtered, slug],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found post with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated post: ", { slug: slug, ...post });
        result(null, { slug: slug, ...post });
      }
  );
};
Post.deleteById = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found post with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted post with id: ", id);
    result(null, res);
  });
};
Post.deleteBySlug = (slug, result) => {
  sql.query("DELETE FROM tutorials WHERE post_name = ?", slug, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found post with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted post with id: ", slug);
    result(null, res);
  });
};
Post.deleteAll = result => {
  sql.query("DELETE FROM posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} post`);
    result(null, res);
  });
};
module.exports = Post;