var id = 4

class Book{
    id
    authors = new Map();
    elements = [];
    authorId = 1;

    constructor(id, title, genre, year, copies, description){
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.copies = copies;
        this.description = description;
        this.id = id;
    }

    addAuthor(author){
        author.setId(this.authorId)
        this.authors.set(this.authorId,author)
        this.authorId++
    }

    addElement(key, value){
        this.elements.push({key, value})
    }
}

class Author{
    id
    name
    elements = [];

    constructor(name){
        this.name = name;
    }

    addElement(key, value){
        this.elements.push({key, value})
    }

    setId(id){
        this.id = id;
    }
}

let books = new Map();

books.set(1, new Book(1,'Ready Player One','Ciencia ficción',2011,2,'En el año 2044​ el mundo es un desastre.  Sin embargo, un videojuego de realidad virtual llamado OASIS proporciona la vía de escape que las personas necesitan.'))
books.set(2,new Book(2,'¿Sueñan los androides con ovejas eléctricas?','Ficción distópica',1968,1,'La acción se sitúa en un mundo lleno de polvo radiactivo después de una guerra nuclear que terminó matando a la mayoría de los animales, llevando a que la gente tenga animales eléctricos.'))
books.set(3,new Book(3,'1984','Derechos humanos',1949,4,'El personaje principal de la novela es Winston Smith, que trabaja en el Ministerio de la Verdad. Su cometido es reescribir la historia'))
books.set(4,new Book(4,'El necronomicón','Terror',2008,3,'El Necronomicón es descrito como un libro de saberes arcanos y magia ritual, cuya lectura provoca la locura y la muerte.'))



books.get(1).addAuthor(new Author('Ernest Cline'));
books.get(2).addAuthor(new Author('Philip K. Dick'));
books.get(3).addAuthor(new Author('George Orwell'));
books.get(4).addAuthor(new Author('H.P.Lovecraft'));
books.get(1).authors.get(books.get(1).authorId-1).addElement("Edad",8)
books.get(1).addElement(1,1)


export function getBooks(){
    return [...books.values()];
}

export function getBook(id){
    
    return books.get(parseInt(id));
}

export function addBook(book){
    id++;
    let newBook = new Book(id, book.title, book.genre, book.year, book.copies, book.description);
    books.set(id,newBook);
}

export function deleteBook(id){
    if (window.confirm("Are you sure to delete this service?")) {
    }
    return false;
}

export function getAuthorBook(id){
    return [...books.get(parseInt(id)).authors.values()];
}

export function editBook(id, book, elements){
    books.get(parseInt(id)).title = book.title;
    books.get(parseInt(id)).genre = book.genre;
    books.get(parseInt(id)).year = book.year;
    books.get(parseInt(id)).copies = book.copies;
    books.get(parseInt(id)).description = book.description;
    for (let i=0;i<elements.length;i++){
        let key = books.get(parseInt(id)).elements[i]['key']
        books.get(parseInt(id)).elements[i] = {key: key, value: elements[i]};
    }
}

export function getAuthor(idBook, idAuthor){
    return books.get(parseInt(idBook)).authors.get(parseInt(idAuthor));
}

export function editAuthor(idBook, idAuthor, name, elements){
    books.get(parseInt(idBook)).authors.get(parseInt(idAuthor)).name = name
    if (elements != undefined)
        for (let i=0;i<elements.length;i++){
            let key = books.get(parseInt(idBook)).authors.get(parseInt(idAuthor)).elements[i]['key']
            books.get(parseInt(idBook)).authors.get(parseInt(idAuthor)).elements[i] = {key: key, value: elements[i]};
        }
}

export function addAuthor(idBook, name){
    books.get(parseInt(idBook)).addAuthor(new Author(name))
}

export function addElementBook(idBook, elementName){
    books.get(parseInt(idBook)).addElement(elementName,"")
}

export function addElementAuthor(idBook, idAuthor, elementName){
    books.get(parseInt(idBook)).authors.get(parseInt(idAuthor)).addElement(elementName,"")
}