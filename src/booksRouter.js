import express from 'express';
import * as bookService from './BookService.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        books: bookService.getBooks(0,5)
    });
});

router.post('/book/new', (req, res) => {
    let { title, genre, year, copies, description, values } = req.body;
    bookService.addBook({ title, genre, year, copies, description });
    bookService.addElementsNewBook(additionalEements, values)
    res.render('saved_book');
});

router.get('/book/:id', (req, res) => {
    let book = bookService.getBook(req.params.id);
    let author = bookService.getAuthorBook(req.params.id)
    res.render('show_book', { book, author });
});
    
router.get('/book/:id/delete', (req, res) => {
    bookService.deleteBook(req.params.id);
    res.redirect("/")
});

router.get('/book/:id/edit', (req, res) => {
    let book = bookService.getBook(req.params.id);
    let author = bookService.getAuthorBook(req.params.id)
    res.render('edit_book', { book, author});
});

router.post('/book/:id/save', (req, res) => {
    let { title, genre, year, copies, elements, description } = req.body;
    bookService.editBook(req.params.id, { title, genre, year, copies, description }, elements);
    let book = bookService.getBook(req.params.id);
    res.render('edited_book', { book });
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
    
router.get('/books', (req, res) => {

    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const books = bookService.getBooks(from,to);

    res.render('books', {
        books: books
    });
});

router.get('/book/:id/author/:id2/delete', (req, res) => {
    bookService.deleteAuthor(req.params.id,req.params.id2);
    res.redirect("/")
});

router.get('/book/:id/:key/delete', (req, res) => {
    bookService.deleteAtribute(req.params.id,req.params.key.toString());
    let book = bookService.getBook(req.params.id);
    let author = bookService.getAuthorBook(req.params.id)
    res.render('show_book', { book, author })
});

let additionalEements = []

router.get('/book', (req, res) => {
    additionalEements = []
    res.render('new_book')
});

router.post('/book', (req, res) => {
    let names = req.body.names;
    additionalEements.push(names)
    res.render('new_book', { additionalEements })
});

router.get('/book/element/new', (req, res) => {
    res.render('add_element_new_book')
});

export default router;