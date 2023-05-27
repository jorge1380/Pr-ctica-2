var id = 4

class Book{
    id
    Authors = new Map();
    Elements = [];
    AuthorId = 0;

    constructor(id, title, genre, year, copies, description){
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.copies = copies;
        this.description = description;
        this.id = id;
    }

    addAuthor(author){
        this.Authors.set(this.AuthorId,author)
        this.AuthorId++
    }

    addElement(key, value){
        this.Elements.push({key, value})
    }
}

class Author{
    id
    Name
    Elements = [];

    constructor(id,name){
        this.Name = name;
        this.id = id;
    }

    addElement(key, value){
        this.Elements.push({key, value})
    }
}

let books = new Map();

books.set(1, new Book(1,'Ready Player One','Ciencia ficción',2011,2,'En el año 2044​ el mundo es un desastre.  Sin embargo, un videojuego de realidad virtual llamado OASIS proporciona la vía de escape que las personas necesitan.'))
books.set(2,new Book(2,'¿Sueñan los androides con ovejas eléctricas?','Ficción distópica',1968,1,'La acción se sitúa en un mundo lleno de polvo radiactivo después de una guerra nuclear que terminó matando a la mayoría de los animales, llevando a que la gente tenga animales eléctricos.'))
books.set(3,new Book(3,'1984','Derechos humanos',1949,4,'El personaje principal de la novela es Winston Smith, que trabaja en el Ministerio de la Verdad. Su cometido es reescribir la historia'))
books.set(4,new Book(4,'El necronomicón','Terror',2008,3,'El Necronomicón es descrito como un libro de saberes arcanos y magia ritual, cuya lectura provoca la locura y la muerte.'))



books.get(1).addAuthor(new Author(1, 'Ernest Cline'));
books.get(2).addAuthor(new Author(1, 'Philip K. Dick'));
books.get(3).addAuthor(new Author(1, 'George Orwell'));
books.get(4).addAuthor(new Author(1, 'H.P.Lovecraft'));
books.get(1).Authors.get(books.get(1).AuthorId-1).addElement("Edad",8)



export function getBooks(){
    return [...books.values()];
}

export function getBook(id){
    
    return books.get(parseInt(id));
}

export function addBook(book){
    id++
    let newBook = new Book(id, book.title, book.genre, book.year, book.copies, book.description)
    books.set(id,newBook)
}

export function deleteBook(id){
    if (window.confirm("Are you sure to delete this service?")) {
    }
    return false;
}

export function getAuthorBook(id){
    return [...books.get(parseInt(id)).Authors.values()]
}


