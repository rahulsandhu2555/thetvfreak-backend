const Post = require("../models/posts.model");

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Post
    const post = new Post({
        post_content: req.body.post_content,
        post_title: req.body.post_title,
        post_name: req.body.post_name,
        post_excerpt: req.body.post_excerpt,
        to_ping: req.body.to_ping,
        pinged: req.body.pinged,
        post_content_filtered: req.body.post_content_filtered
    });
    // Save Post in the database
    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        else res.send(data);
    });
};

// Retrieve all Posts from the database (with condition).
exports.findAll = (req, res) => {

};
// Find a single Post with a id
exports.findById = (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Post with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
exports.findBySlug = (req, res) => {
    Post.findBySlug(req.params.slug, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.slug}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Post with slug  " + req.params.slug
                });
            }
        } else res.send(data);
    });
};

// Update a Post identified by the id in the request
exports.updateById = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Post.updateById(
        req.params.id,
        new Post(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Post with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Update a Post identified by the id in the request
exports.updateBySlug = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Post.updateBySlug(
        req.params.slug,
        new Post(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Post with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// find all published Posts
exports.findAllPublished = (req, res) => {
    Post.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Posts."
            });
        else res.send(data);
    });
};

// Delete a Post with the specified id in the request
exports.deleteById = (req, res) => {
    Post.deleteById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Post with id " + req.params.id
                });
            }
        } else res.send({ message: `Post was deleted successfully!` });
    });
};
exports.deleteBySlug = (req, res) => {
    Post.deleteBySlug(req.params.slug, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Post with id " + req.params.id
                });
            }
        } else res.send({ message: `Post was deleted successfully!` });
    });
};
// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Post.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all posts."
            });
        else res.send({ message: `All posts were deleted successfully!` });
    });
};

exports.findAllPosts = (req, res) => {
    console.log('inside url')
    const title = req.query.title;
    Post.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        else res.send(data);
    });
};