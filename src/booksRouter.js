import express from 'express';
import * as bookService from './bookService.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        books: bookService.getBooks()
    });
});

router.post('/book/new', (req, res) => {
    let { title, genre, year, copies, description } = req.body;
    bookService.addBook({ title, genre, year, copies, description });
    res.render('saved_book');
});

router.get('/book/:id', (req, res) => {
    let book = bookService.getBook(req.params.id);
    let author = bookService.getAuthorBook(req.params.id)
    res.render('show_book', { book, author });
    
});
    
router.get('/book/:id/delete', (req, res) => {
    let result = bookService.deleteBook(req.params.id);
    if (result){
        res.render('deleted_book');
    }
});
    
export default router;