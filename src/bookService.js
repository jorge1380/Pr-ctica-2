var id = 4

class Book{
    id
    Authors = new Map();
    Elements = new Map();
    ElementsName = [];
    AuthorId = 0;

    constructor(id, title, genre, year, copies, description){
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.copies = copies;
        this.description = description;
        this.id = id;
    }

    toString(){
        let b = '';
        b += '<table><tr><td>Género:</td><td>' + this.genre +'</td><tr><td>Año:</td><td>' + this.year +
        '</td></tr><tr><td>Ejemplares:</td><td>' + this.copies +'</td></tr><tr><td>Descripción:</td><td>' + this.description + '</td></tr>';
        for (let d=0; d<this.ElementsName.length;d++){
            b += '<tr><td>' + this.ElementsName[d] + 
            ':</td><td>' + this.Elements[this.ElementsName[d]] + '</td></tr>'
        }
        if (this.Author.length !== 0)
		b += '<tr><td>Autor/es:</td><td>';
        for (let a=0; a<this.Author.length;a++){
        	b += this.Author[a].Name;
		    if (a !== this.Author.length-1)
		    	b += ', ';
        }
        b += '</td></tr></table>';
        if (this.Author.length !== 0){
            b+='<h6>Información Autor/es</h6>';
            for (let a=0; a<this.Author.length;a++){
                b += '<table><tr><td>Nombre:</td><td>' + this.Author[a].Name + '</td>';
                for (let c=0; c<this.Author[a].ElementsName.length;c++){
                    b += '<tr><td>' + this.Author[a].ElementsName[c] + 
                    ':</td><td>' + this.Author[a].Elements[this.Author[a].ElementsName[c]] + '</td></tr>'
                }
            }
            b += '</table>'
        }
        return b;
        }

    addAuthor(author){
        this.Authors.set(this.AuthorId,author)
        this.AuthorId++
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
let key = "hola"
let value = "Antonio"
books.get(1).Authors.get(books.get(1).AuthorId-1).ElementsName.push({key, value})



export function getBooks(){
    return [...books.values()];
}

export function getBook(id){
    
    return books.get(parseInt(id));
}

export function addBook(title, genre, year, copies, description){
    id++
    let book = new Book(id,title,genre,year,copies,description)
    books.set(id,book)
}

export function deleteBook(id){
    let result = window.confirm('¿Está seguro de querer borrar este libro?');
    if (result) {
        return books.delete(id);
    }
    return false;
}

export function getAuthorBook(id){
    return [...books.get(parseInt(id)).Authors.values()]
}


