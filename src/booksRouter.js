import express from 'express';
import * as bookService from './BookService.js';
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

router.get('/book/:id/edit', (req, res) => {
    let book = bookService.getBook(req.params.id);
    let author = bookService.getAuthorBook(req.params.id)
    res.render('edit_book', { book, author});
});

router.post('/book/:id/save', (req, res) => {
    let { title, genre, year, copies, elements, description } = req.body;
    bookService.editBook(req.params.id, { title, genre, year, copies, description }, elements);
    res.render('edited_book');
});

router.get('/book/:id/author/:id2/edit', (req, res) => {
    let author = bookService.getAuthor(req.params.id,req.params.id2);
    let book = bookService.getBook(req.params.id)
    res.render('edit_author', { author, book });
});

router.post('/book/:id/author/:id2/save', (req, res) => {
    let { name, elements } = req.body;
    bookService.editAuthor(req.params.id, req.params.id2, name, elements);
    res.render('edited_author');
});

router.get('/book/:id/author', (req, res) => {
    let book = bookService.getBook(req.params.id)
    res.render('new_author', { book });
});

router.post('/book/:id/author/new', (req, res) => {
    let { name } = req.body;
    bookService.addAuthor(req.params.id, name);
    res.render('saved_author');
});

router.get('/book/:id/element', (req, res) => {
    let book = bookService.getBook(req.params.id)
    res.render('add_element_book', { book });
});

router.post('/book/:id/element/new', (req, res) => {
    let { name } = req.body;
    bookService.addElementBook(req.params.id, name);
    let book = bookService.getBook(req.params.id);
    let author = bookService.getAuthorBook(req.params.id)
    res.render('edit_book', { book, author});
});

router.get('/book/:id/author/:id2/element', (req, res) => {
    let book = bookService.getBook(req.params.id)
    let author = bookService.getAuthor(req.params.id, req.params.id2)
    res.render('add_element_author', { book, author });
});

router.post('/book/:id/author/:id2/element/new', (req, res) => {
    let { name } = req.body;
    bookService.addElementAuthor(req.params.id, req.params.id2, name);
    let author = bookService.getAuthor(req.params.id,req.params.id2);
    let book = bookService.getBook(req.params.id)
    res.render('edit_author', { author, book });
});
    
export default router;