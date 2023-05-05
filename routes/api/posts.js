const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const postData = require('../../public/js/Posts');


//Get all members with the posts
router.get('/', (req, res) => res.json(postData));

//Get single member
router.get('/:postId', (req, res) => {
    const found = postData.some(postData => postData.postId === parseInt(req.params.postId));

    if (found) {
        res.json(postData.filter(postData => postData.postId === parseInt(req.params.postId)));

    } else {
        res.status(400).json({ msg: `No post with the id of ${req.params.postId}` })
    }

});

//Make a new posts

router.post('/', (req, res) => {

    res.send(req.body);
    const newPost = {
        postId: uuid.v4(),
        post_title: req.body.post_title,
        post_date: req.body.post_date,
        post_body: req.body.post_body,
        post_poster_id: req.body.post_poster_id,
        post_poster_details: req.body.post_poster_details,
        status: 'Active'

    };

    if (!newPost.post_poster_id || !newPost.post_body) {
        return res.status(400).json({ msg: 'Please write something as your post' });

    }

    postData.push(newPost);
    res.json(postData);
    res.redirect('/explore');

});




//UpdatePost

router.put('/:postId', (req, res) => {
    const found = postData.some(postData => postData.postId === parseInt(req.params.postId));

    if (found) {
        const UpdatePost = req.body;
        postData.forEach(posts => {
            if (posts.postId === parseInt(req.params.postId)) {
                posts.post_body = UpdatePost.post_body ? UpdatePost : posts.post_body;
                posts.post_title = UpdatePost.post_title ? UpdatePost : posts.post_title;
                posts.post_date = UpdatePost.post_date ? UpdatePost : posts.post_date;

                res.json({ msg: 'Post updated successfully', posts });

            }
        });


    } else {
        res.status(400).json({ msg: `No any post with the id of ${req.params.postId}` })
    }

});

//Delete post
router.delete('/:postId', (req, res) => {
    const found = postData.some(postData => postData.postId === parseInt(req.params.postId));

    if (found) {
        res.json({
            msg: 'Post deleted successfully',
            postData: postData.filter(postData => postData.postId !== parseInt(req.params.postId))
        });

    } else {
        res.status(400).json({ msg: `No any post with the id of ${req.params.postId}` })
    }

});

module.exports = router;