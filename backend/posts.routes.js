const posts = require("./controllers/posts.controller");
module.exports = app => {
    const posts = require("../backend/controllers/posts.controller");
    let router = require("express").Router();

    router.post("/fetch-posts", posts.fetchPosts);
    router.get("/fetch-posts-stats", posts.fetchPostsStats);

    router.get("/posts", posts.findAllPosts);
    router.get("/total-number-of-posts", posts.findTotalNumberOfPosts);
    router.get("/get-all-categories", posts.getAllCategories);
    router.get("/list-of-posts", posts.findListOfPostUrls);
    router.get("/list-of-category-posts/:category", posts.getAllCategoryPosts);
    router.get("/number-of-category-posts/:category", posts.getNumberOfCategoryPosts);

    // Create a new Posts

    router.post("/", posts.create);
    router.post("/postmeta", posts.createPostMeta);

    // Retrieve a single Posts with id
    router.get("/id/:id", posts.findById);

    // Retrieve a single Posts with id
    router.get("/:slug", posts.findBySlug);

    // Update a Posts with id
    router.put("/id/:id", posts.updateById);

    // Update a Posts with slug
    router.put("/:slug", posts.updateBySlug);

    router.delete("/id/:id", posts.deleteById);
    router.delete("/:slug", posts.deleteBySlug);

    // Delete all Posts
    router.delete("/", posts.deleteAll);

    // Retrieve all published Posts
    router.get("/published", posts.findAllPublished);
    app.use('/blog', router);
};