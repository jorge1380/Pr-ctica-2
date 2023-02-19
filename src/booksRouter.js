import express from 'express';
import * as bookService from './bookService.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        posts: bookService.getPosts()
    });
});

router.post('/book/new', (req, res) => {
    let { user, title, text } = req.body;
    bookService.addPost({ user, title, text });
    res.render('saved_book');
});

router.get('/book/:id', (req, res) => {
    let post = bookService.getPost(req.params.id);
    res.render('show_book', { post });
});
    
router.get('/book/:id/delete', (req, res) => {
    bookService.deleteElement(req.params.id);
    res.render('deleted_book');
});
    
export default router;