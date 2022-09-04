module.exports = app => {
    const posts = require("../backend/controllers/posts.controller");
    let router = require("express").Router();
    router.get("/posts", posts.findAllPosts);

    // Create a new Posts
    router.post("/", posts.create);

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

    // Retrieve all Posts
    // router.get("/", posts.findAll);

    // Retrieve all published Posts
    router.get("/published", posts.findAllPublished);
    app.use('/blog', router);
};