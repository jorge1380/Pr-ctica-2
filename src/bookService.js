var id = 0

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

addBook(new Book(1,'Ready Player One','Ciencia ficción',2011,2,'En el año 2044​ el mundo es un desastre.  Sin embargo, un videojuego de realidad virtual llamado OASIS proporciona la vía de escape que las personas necesitan.'))
addBook(new Book(1,'¿Sueñan los androides con ovejas eléctricas?','Ficción distópica',1968,1,'La acción se sitúa en un mundo lleno de polvo radiactivo después de una guerra nuclear que terminó matando a la mayoría de los animales, llevando a que la gente tenga animales eléctricos.'))
addBook(new Book(1,'1984','Derechos humanos',1949,4,'El personaje principal de la novela es Winston Smith, que trabaja en el Ministerio de la Verdad. Su cometido es reescribir la historia'))
addBook(new Book(1,'El necronomicón','Terror',2008,3,'El Necronomicón es descrito como un libro de saberes arcanos y magia ritual, cuya lectura provoca la locura y la muerte.'))
addBook(new Book(1,'Harry Potter','Fantasía',1997,80,'Harry Potter es una serie de novelas fantásticas escrita por la autora británica J. K. Rowling, en la que se describen las aventuras del joven aprendiz de magia y hechicería Harry Potter y sus amigos Hermione Granger y Ron Weasley, durante los años que pasan en el Colegio Hogwarts de Magia y Hechicería.'))
addBook(new Book(1,'El Señor de los Anillos','Fantasía heroica',1954,15,'La novela narra el viaje del protagonista principal, Frodo Bolsón, hobbit de la Comarca, para destruir el Anillo Único y la consiguiente guerra que provocará el enemigo para recuperarlo, ya que es la principal fuente de poder de su creador, el Señor oscuro Sauron.'))
addBook(new Book(1,'El alquimista','Ficción de aventuras y literatura fantástica',1988,20,'El alquimista relata las aventuras de Santiago, un joven pastor andaluz que viaja desde su tierra natal hacia el desierto egipcio en busca de un tesoro oculto en las pirámides. La imaginación y el coraje del protagonista le hacen perseguir su "Leyenda Personal". A lo largo del relato, Santiago se encuentra con diferentes personajes que lo ayudan a aprender a mantener su valor y, sobre todo, escuchar los dictados del corazón.'))
addBook(new Book(1,'El código Da Vinci','Novela policíaca',2003,34,'El libro narra los intentos de Robert Langdon, Profesor de Iconografía Religiosa de la Universidad Harvard, para resolver el misterioso asesinato de Jacques Saunière ocurrido en el Museo del Louvre en París.'))
addBook(new Book(1,'Piense y hágase rico','Autoayuda y superación personal',1937,47,'Para escribirlo, Napoleón Hill entrevistó a las 500 familias más ricas de los Estados Unidos, quienes le revelaron al autor el origen de su fortuna. Promocionado por Mahatma Gandhi, fue ampliamente distribuido en la India de su tiempo.'))
addBook(new Book(1,'Diario de Ana Frank','Autobiografía',1947,2,'En los relatos, se cuenta la historia y vida de Ana Frank como adolescente y los dos años en que permaneció oculta junto a su familia de origen judío de los nazis en Ámsterdam, en plena Segunda Guerra Mundial, hasta que fueron descubiertos.'))
addBook(new Book(1,'Don Quijote de la Mancha','	Novela de aventuras y parodia de las novelas de caballerías',1605,100,'El ingenioso hidalgo don Quijote de la Mancha narra las aventuras de Alonso Quijano, un hidalgo pobre que de tanto leer novelas de caballería acaba enloqueciendo y creyendo ser un caballero andante, nombrándose a sí mismo como don Quijote de la Mancha.'))

books.get(1).addAuthor(new Author('Ernest Cline'));
books.get(2).addAuthor(new Author('Philip K. Dick'));
books.get(3).addAuthor(new Author('George Orwell'));
books.get(4).addAuthor(new Author('H.P.Lovecraft'));
books.get(5).addAuthor(new Author('J.K. Rowlings'));
books.get(6).addAuthor(new Author('J.R.R. Tolkien'));
books.get(7).addAuthor(new Author('Paulo Coelho'));
books.get(8).addAuthor(new Author('Dan Brown'));
books.get(9).addAuthor(new Author('Napoleón Hill'));
books.get(10).addAuthor(new Author('Ana Frank'));
books.get(11).addAuthor(new Author('Miguel de Cervantes'));


books.get(1).authors.get(books.get(1).authorId-1).addElement("Edad",8)



export function getBooks(from, to){
    let values = [...books.values()];
    if (from !== undefined) {
        return values.slice(from, to);
    } else {
        return values;
    }
       
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
    books.delete(parseInt(id));
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
    if (elements != null){
        for (let i=0;i<elements.length;i++){
            let key = books.get(parseInt(id)).elements[i]['key']
            books.get(parseInt(id)).elements[i] = {key: key, value: elements[i]};
        }
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

export function deleteAuthor(idBook, idAuthor){
    books.get(parseInt(idBook)).authors.delete(parseInt(idAuthor));
}

export function deleteAtribute(idBook, atributeKey){
    for (let i=0;i<books.get(parseInt(idBook)).elements.length;i++){
        if (books.get(parseInt(idBook)).elements[i]['key'] ==  atributeKey)
            books.get(parseInt(idBook)).elements.splice(i,1)
    }
}

export function addElementsNewBook(elementsName, elementsValue){
    if (elementsName.length != 0){
        for (let i=0;i<elementsName.length;i++){
            books.get(id).addElement(elementsName[i],elementsValue[i])
        }
    }
}  

export function addAuthorsNewBook(authorsNames){
    if (authorsNames != undefined){
        if (authorsNames.length != 0){
            for (let i=0;i<authorsNames.length;i++){
                books.get(id).addAuthor(new Author(authorsNames[i]))
            }
        }
    }
}  

export function addElementNewAuthor(idBook, elementsNames, elementsValues){
    if (elementsNames.length != 0){
        for (let i=0;i<elementsNames.length;i++){
            books.get(parseInt(idBook)).authors.get(books.get(parseInt(idBook)).authorId-1).addElement(elementsNames[i],elementsValues[i])
        }
    }
}

export function deleteAtributeFromAuthor(idBook,idAuthor,atributeKey){
    console.log(atributeKey)
    for (let i=0;i<books.get(parseInt(idBook)).authors.get(parseInt(idAuthor)).elements.length;i++){
        if (books.get(parseInt(idBook)).authors.get(parseInt(idAuthor)).elements[i]['key'] ==  atributeKey)
            books.get(parseInt(idBook)).authors.get(parseInt(idAuthor)).elements.splice(i,1)
    }
}

