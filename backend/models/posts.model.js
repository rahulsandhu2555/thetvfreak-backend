const sql = require("../db");
const dbConfig = require('../dbConfig');
// constructor
const Post = function (post) {
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
        console.log("created Post: ", {id: res.insertId, ...newPost});
        result(null, {id: res.insertId, ...newPost});
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
        result({kind: "not_found"}, null);
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
        result({kind: "not_found"}, null);
    });
};
Post.getAll = (pageNumber, result) => {
    let query = "SELECT posts.post_title, posts.post_excerpt, posts.post_name, postmeta.meta_value as featured_image FROM posts " + "LEFT JOIN postmeta ON posts.ID = postmeta.post_id " + "where posts.post_type = 'post' and postmeta.meta_key = '_thumbnail_id' " + "ORDER BY post_date desc " + `limit ${pageNumber * dbConfig.listPerPage}, ${dbConfig.listPerPage}`;
    console.log(query)

    // query += ` WHERE title LIKE '%${title}%'`;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("post: ", res);
        result(null, res);
    });
};
Post.fetchPosts = (category, pageNumber, result) => {
    let query = ''
    if (category) {
        query = `select posts.post_title, posts.post_excerpt, posts.post_name, d.meta_value as featured_image from posts inner join (
            select object_id from term_relationships a inner join
            (select term_taxonomy.term_taxonomy_id, term_taxonomy.term_id, taxonomy, name, slug
            from term_taxonomy inner join terms
            on terms.term_id = term_taxonomy.term_id where taxonomy='category' and slug='${category}') b
            on a.term_taxonomy_id = b.term_taxonomy_id) c
            on posts.ID = c.object_id LEFT JOIN (select * from postmeta where meta_key = '_thumbnail_id') d ON posts.ID = d.post_id where posts.post_type = 'post'
            ORDER BY posts.post_date desc limit ${(pageNumber-1) * dbConfig.listPerPage}, ${dbConfig.listPerPage}`;
    } else {
        query = `SELECT posts.post_title, posts.post_excerpt, posts.post_name, d.meta_value as featured_image FROM posts 
                 LEFT JOIN (select * from postmeta where meta_key = '_thumbnail_id') d ON posts.ID = d.post_id 
                 where posts.post_type = 'post' 
            ORDER BY post_date desc limit ${(pageNumber-1) * dbConfig.listPerPage}, ${dbConfig.listPerPage}`
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
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
Post.findTotalNumberOfPosts = result => {
    sql.query("SELECT count(*) as total FROM posts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("posts: ", res[0]);
        result(null, res[0]);
    });
};
Post.getAllCategories = result => {
    sql.query("select distinct(slug) from term_taxonomy inner join terms on terms.term_id = term_taxonomy.term_id where taxonomy='category'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("posts: ", res);
        result(null, res);
    });
};
Post.getAllCategoryPosts = (category, page, result) => {
    console.log(category, page)
    sql.query(`select posts.post_title, posts.post_excerpt, posts.post_name from posts inner join (
                select object_id from term_relationships a inner join 
                (select term_taxonomy.term_taxonomy_id, term_taxonomy.term_id, taxonomy, name, slug 
                    from term_taxonomy inner join terms 
                    on terms.term_id = term_taxonomy.term_id where taxonomy='category' and slug='${category}') b 
                on a.term_taxonomy_id = b.term_taxonomy_id) c 
                on posts.ID = c.object_id` + " ORDER BY posts.post_date desc " + `limit ${page * dbConfig.listPerPage}, ${dbConfig.listPerPage}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            // console.log("found post: ", res);
            result(null, res);
            return;
        }
        // not found post with the id
        result({kind: "not_found"}, null);
    });
};
Post.getNumberOfCategoryPosts = (category, result) => {
    sql.query(`select count(*) as count from posts inner join (
                select object_id from term_relationships a inner join 
                (select term_taxonomy.term_taxonomy_id, term_taxonomy.term_id, taxonomy, name, slug 
                    from term_taxonomy inner join terms 
                    on terms.term_id = term_taxonomy.term_id where taxonomy='category' and slug='${category}') b 
                on a.term_taxonomy_id = b.term_taxonomy_id) c 
                on posts.ID = c.object_id`, (err, res) => {
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
        result({kind: "not_found"}, null);
    });
};
Post.fetchPostsStats = (result) => {
    let count = [];
    sql.query(`select slug, count(slug) as count from posts inner join (
                select object_id, slug from term_relationships a inner join 
                (select term_taxonomy.term_taxonomy_id, term_taxonomy.term_id, taxonomy, name, slug 
                    from term_taxonomy inner join terms 
                    on terms.term_id = term_taxonomy.term_id where taxonomy='category') b 
                on a.term_taxonomy_id = b.term_taxonomy_id) c 
                on posts.ID = c.object_id group by c.slug`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found post: ", res);
            count = [...res]
        }
        // not found post with the id
        // result({kind: "not_found"}, null);
    });
    sql.query(`SELECT count(*) as count FROM posts where posts.post_type = 'post'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found post: ", res);
            const totalCount = res[0]
            totalCount.slug = 'all'
            count.push(totalCount)
            result(null, count);
            return;
        }
        // not found post with the id
        result({kind: "not_found"}, null);
    });

};
Post.findListOfPostUrls = result => {
    sql.query("SELECT post_name FROM posts", (err, res) => {
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
    sql.query("UPDATE posts SET post_content = ?, post_title = ?, post_name = ?, post_excerpt = ?, post_content_filtered = ? WHERE id = ?", [post.post_content, post.post_title, post.post_name, post.post_excerpt, post.post_content_filtered, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found post with the id
            result({kind: "not_found"}, null);
            return;
        }
        console.log("updated post: ", {id: id, ...post});
        result(null, {id: id, ...post});
    });
};
Post.updateBySlug = (slug, post, result) => {
    sql.query("UPDATE posts SET post_content = ?, post_title = ?, post_name = ?, post_excerpt = ?, post_content_filtered = ? WHERE post_name = ?", [post.post_content, post.post_title, post.post_name, post.post_excerpt, post.post_content_filtered, slug], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found post with the id
            result({kind: "not_found"}, null);
            return;
        }
        console.log("updated post: ", {slug: slug, ...post});
        result(null, {slug: slug, ...post});
    });
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
            result({kind: "not_found"}, null);
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
            result({kind: "not_found"}, null);
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