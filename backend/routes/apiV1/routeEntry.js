const { Router } = require('express');
const rateLimit = require('express-rate-limit');
// const gifs = require('../../controllers/gifs');
// const feed = require('../../controllers/feed');
// const articles = require('../../controllers/articles');
// const comments = require('../../controllers/comments');
// const { Auth } = require('../../middleware/Auth');
// const Multer = require('../../middleware/Multer');


// Importing endpoints to application resources
const authRoute = require('./authRoute');

const router = new Router();
const postLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
});

// Regular Endpoints
// router.post('/gifs', postLimiter, Auth.verifyToken, Multer.any(), gifs.create);
// router.get('/gifs/:gifId', Auth.verifyToken, gifs.getOneGif);
// router.delete('/gifs/:gifId', Auth.verifyToken, gifs.delete);
// router.post('/articles', postLimiter, Auth.verifyToken, articles.create);
// router.get('/articles/:articleId', Auth.verifyToken, articles.getOneArticle);
// router.patch('/articles/:articleId', Auth.verifyToken, articles.update);
// router.delete('/articles/:articleId', Auth.verifyToken, articles.delete);
// router.get('/feed', Auth.verifyToken, feed.getAll);
// router.post('/articles/:articleId/comment', postLimiter, Auth.verifyToken, comments.createArticleComment);
// router.post('/gifs/:gifId/comment', postLimiter, Auth.verifyToken, comments.createGifComment);

// Login/Register Router
router.use('/auth', authRoute);


module.exports = router;
