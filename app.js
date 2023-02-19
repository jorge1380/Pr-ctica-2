class Book{
    Author = [];
    Elements = new Map();
    ElementsName = [];

    constructor(title, gender, year, copies, description){
        this.title = title;
        this.gender = gender;
        this.year = year;
        this.copies = copies;
        this.description = description;
    }

    toString(){
        let b = '';
        b += '<table><tr><td>Género:</td><td>' + this.gender +'</td><tr><td>Año:</td><td>' + this.year +
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
}

class Author{
    Name
    Elements = new Map();
    ElementsName = [];

    constructor(name){
        this.Name = name;
    }
}

let books = [new Book('Ready Player One','Ciencia ficción',2011,2,'En el año 2044​ el mundo es un desastre.  Sin embargo, un videojuego de realidad virtual llamado OASIS proporciona la vía de escape que las personas necesitan.'),
    new Book('¿Sueñan los androides con ovejas eléctricas?','Ficción distópica',1968,1,'La acción se sitúa en un mundo lleno de polvo radiactivo después de una guerra nuclear que terminó matando a la mayoría de los animales, llevando a que la gente tenga animales eléctricos.'),
    new Book('1984','Derechos humanos',1949,4,'El personaje principal de la novela es Winston Smith, que trabaja en el Ministerio de la Verdad. Su cometido es reescribir la historia'),
    new Book('El necronomicón','Terror',2008,3,'El Necronomicón es descrito como un libro de saberes arcanos y magia ritual, cuya lectura provoca la locura y la muerte.')
]

books[0].Author[0] = new Author('Ernest Cline');
books[1].Author[0] = new Author('Philip K. Dick');
books[2].Author[0] = new Author('George Orwell');
books[3].Author[0] = new Author('H.P.Lovecraft');
for (let a=0;a<books.length;a++){
    let div = document.getElementById('NewAtributes');
    let NewDiv = document.createElement('div');
    div.appendChild(NewDiv);
    NewDiv.id = 'Input' + a +'01';
    }

let content = document.getElementById('content');

for (let i = 0; i < books.length; i++) {
    let libro = books[i];    
    addLibroToDOM(libro, i);
    let AtributesDiv = document.getElementById('input-atributes');
    let DivElem;
    
    DivElem = document.createElement('div');
    AtributesDiv.appendChild(DivElem);
    DivElem.id = 'DivElem' + i;
    DivElem.style.display = 'none';
}

function showHide(id) {
    let moreInfoElement = document.getElementById(id);
    let display = moreInfoElement.style.display;
    if (display === "none") {
        moreInfoElement.style.display = "block";
    } else {
        moreInfoElement.style.display = "none";
    }
}

function deleteElement(idDeleteBook) {
    let Div = document.getElementById('DivElem' + idDeleteBook);
    if (Div != null)
        Div.parentNode.removeChild(Div);
    books.splice(idDeleteBook,1);
    for(let a=0; a<=books.length; a++){
        let DeletedBookId = document.getElementById('divlibro'+ a);
        DeletedBookId.parentNode.removeChild(DeletedBookId);    
    }
    for(let a=0; a<books.length; a++){        
    	addLibroToDOM(books[a],a);
    }
    if (books.length === 0)
	content.textContent = 'Sin elementos';
}

function MoreInfo(i){
    for (let a = 0; a < books.length; a++){
	    if (a !== i)
		showHide('Bot' + a);
	    if (a !== i)
		showHide('titulo-libro-' + a);
	    };
    showHide('Anadir');
    showHide('masinfo-libro-' + i)
    }

function addLibroToDOM(libro, i) {
    let div = document.createElement("div");
    content.appendChild(div);
    div.id = 'divlibro' + i;

    let pTitulo = document.createElement("p");
    div.appendChild(pTitulo);
    pTitulo.id = 'titulo-libro-' + i;
    pTitulo.innerHTML = '<h6>' + books[i].title + '</h6>';

    let button = document.createElement("button");
    div.appendChild(button);
    button.id = 'Bot' + i;
    button.className = "btn btn-info";
    button.textContent = "Más info";
    button.onclick = () => {MoreInfo(i);
	    showHide('Bot' + i);
    }

    let pMasInfo = document.createElement("p");
    div.appendChild(pMasInfo);
    pMasInfo.style.display = 'none';
    pMasInfo.className = "btn-group"
    pMasInfo.id = 'masinfo-libro-' + i;
    pMasInfo.innerHTML = libro.toString();
	
    let botonBorrado = document.createElement("button");
    pMasInfo.appendChild(botonBorrado);
    botonBorrado.textContent = "Borrar Libro";
    botonBorrado.className = "btn btn-danger";
    botonBorrado.onclick = () => {
        let result = window.confirm('¿Esta seguro de querer borrar este libro?');
        if (result){
		MoreInfo(i);
		deleteElement(i);
        }
    }

    let botonEditar = document.createElement("button");
    pMasInfo.appendChild(botonEditar);
    botonEditar.className = "btn btn-success";
    botonEditar.textContent = "Editar Libro";
    botonEditar.onclick = () => EditInterface(i)
    
    let botonVolver = document.createElement("button");
    pMasInfo.appendChild(botonVolver);
    botonVolver.className ="btn btn-warning";
    botonVolver.textContent = "Volver";
    botonVolver.onclick = () => {MoreInfo(i);
    showHide('Bot' + i);
    }
}

function addLibro(NewBk) {
    books.push(NewBk);
    addLibroToDOM(NewBk, books.length - 1);
    showHide('Anadir');
    showHide('content');
    showHide('NL');
}

function newBook() {
    if (books.length === 0)
	    content.textContent = '';
    showHide('InputsAñadir');
    let title = GetInputValue('titulo');
    let author = GetInputValue('genero');
    let year = GetInputValue('año');
    let copies = GetInputValue('ejemplares');
    let description = GetInputValue('descripcion');
    let l = new Book(title,author,year,copies, description);
    addLibro(l);
}

function AddInterface(){
    showHide('InputsAñadir');
    showHide('Anadir');
    showHide('AddAtribute');
    showHide('content');
    showHide('NL');
    let titleInput = document.getElementById('titulo');
    titleInput.placeholder='Título del libro';
    titleInput.value = '';
    let authorInput = document.getElementById('genero');
    authorInput.placeholder='Autor';
    authorInput.value = '';
    let yearInput = document.getElementById('año');
    yearInput.placeholder='Año de publicación';
    yearInput.value = '';
    let copiesInput = document.getElementById('ejemplares');
    copiesInput.placeholder='Número de ejemplares';
    copiesInput.value = '';
    let descriptionInput = document.getElementById('descripcion');
    descriptionInput.placeholder='Descripción';
    descriptionInput.value = '';

    AtributesDiv = document.getElementById('input-atributes');

    DivElem = document.createElement('div');
    AtributesDiv.appendChild(DivElem);
    DivElem.id = 'DivElem' + books.length;

    let Array = [];
    let AddAtrib = document.getElementById('AddAtribute');
    AddAtrib.onclick = () => {
        AddAtribute(Array)
    }

    let NewLibButt = document.getElementById('NL');
    NewLibButt.onclick = () => {
        newBook()
        for (let a=0;a<Array.length;a++){
            let ElementContent = document.getElementById('Lib' + (books.length-1) + Array[a])
            if (ElementContent != null)
                books[books.length-1].Elements[Array[a]] = ElementContent.value;
                books[books.length-1].ElementsName.push(Array[a])
        }
        showHide('DivElem' + (books.length-1))
        showHide('AddAtribute');
        ResetInfo();
    }
}

function EditInterface(id){
    showHide('content');
    showHide('InputsAñadir');
    showHide('DivElem' + id);
    let Inputs = document.getElementById('input-subelementos')
    let Div = document.createElement('div')
    Div.id = 'Div' + id;
    Inputs.appendChild(Div);

    let InputTitle = document.getElementById('titulo');
    InputTitle.value = books[id].title;

    let InputGender = document.getElementById('genero');
    InputGender.value = books[id].gender;

    let InputYear = document.getElementById('año');
    InputYear.value = books[id].year;

    let InputCopies = document.getElementById('ejemplares');
    InputCopies.value = books[id].copies;

    let InputDescrip = document.getElementById('descripcion');
    InputDescrip.value = books[id].description;


    for (let i=0;i<books[id].Author.length;i++){
        let pB = document.createElement('p');
        Div.appendChild(pB)
        if (i === 0)
        pB.textContent = 'Autor/es: '
        let input = document.createElement('input');
        pB.appendChild(input)
        input.id = 'Input' + id + i
        input.value = books[id].Author[i].Name;
        let DeleteButt = document.createElement('button');
        pB.appendChild(DeleteButt);
        DeleteButt.className = "btn btn-danger";
        DeleteButt.textContent = 'Borrar'
        DeleteButt.onclick = () => DeleteSubelement(id,i);

        let EditButt = document.createElement('button');
        pB.appendChild(EditButt);
        EditButt.className = "btn btn-success";
        EditButt.textContent = 'Editar'
        EditButt.onclick = () => {EditSubelement(id,i);
            showHide('DivElem' + id);
        }
    }    
    
    let butts = document.getElementById('botones');
    let button = document.createElement('button');
    butts.appendChild(button);
    button.className = 'btn btn-success';
    button.id = 'b1';
    button.textContent = 'Guardar';
    button.onclick = () => {
        let v = GetInputValue('titulo')
        if (v !== '')
		books[id].title = v;

        v = GetInputValue('genero')
        if (v !== '')
		books[id].gender = v;

        v = GetInputValue('año')
        if (v !== '')
		books[id].year = v;

        v = GetInputValue('ejemplares')
        if (v !== '')
		books[id].copies = v;

        v = GetInputValue('descripcion')
        if (v !== '')
		books[id].description = v;

        for (let a=0;a<books[id].Author.length;a++){
            let v = GetInputValue('Input' + id + a);
            if (v !== '')
                books[id].Author[a].Name = v;
        }

        for (let a=0;a<=books[id].ElementsName.length;a++){
            let DeleteButton = document.getElementById('DelLib' + a);
            if (DeleteButton != null){
                DeleteButton.parentNode.removeChild(DeleteButton);
            }
        }

        for (let a=0;a<books[id].ElementsName.length;a++){
            let Input = document.getElementById('Lib' + id + books[id].ElementsName[a])
            if (Input != null){
                books[id].Elements[books[id].ElementsName[a]] = Input.value;
                Input.value = books[id].Elements[books[id].ElementsName[a]];
            }
        }

        ResetInfo()
        butts.removeChild(button);
        butts.removeChild(boton2);
        butts.removeChild(buttonAñadirSub);
        butts.removeChild(AddAtributeButton);
        showHide('content');
        showHide('Bot' + id);
        Div = document.getElementById('Div' + id)
        Div.parentNode.removeChild(Div);
        showHide('InputsAñadir');
        showHide('Anadir');
        MoreInfo(id);
        showHide('DivElem' + id);
    }

    let boton2 = document.createElement('button2');
    butts.appendChild(boton2);
    boton2.textContent = 'Cancelar';
    boton2.className = "btn btn-danger";
    boton2.id = 'b2';
    boton2.onclick = () => {
        showHide('content');
        butts.removeChild(boton2);
        butts.removeChild(button)
        butts.removeChild(buttonAñadirSub);
        butts.removeChild(AddAtributeButton);
        Div = document.getElementById('Div' + id)
        Div.parentNode.removeChild(Div);
        showHide('InputsAñadir');
        showHide('DivElem' + id);
        for (let a=0;a<=books[id].ElementsName.length;a++){
            let DeleteButton = document.getElementById('DelLib' + a);
            if (DeleteButton != null){
                DeleteButton.parentNode.removeChild(DeleteButton);
            }
        }
    }
 
    let buttonAñadirSub = document.createElement("button");
    butts.appendChild(buttonAñadirSub);
    buttonAñadirSub.className = "btn btn-success";
    buttonAñadirSub.id = 'b3';
    buttonAñadirSub.textContent = "Añadir Autor";
    buttonAñadirSub.onclick = () => {showHide('ASubE');
        showHide('AAtribute');
        AddSubelement(id);
        butts.removeChild(buttonAñadirSub);
        butts.removeChild(boton2);
        butts.removeChild(button);
        butts.removeChild(AddAtributeButton);
        Div = document.getElementById('Div' + id)
        Div.parentNode.removeChild(Div);
        showHide('InputsAñadir');
        showHide('DivElem' + id);
    }

    for (let a=0;a<books[id].ElementsName.length;a++){
        let Input = document.getElementById('Lib' + id + books[id].ElementsName[a])
        Input.value = books[id].Elements[books[id].ElementsName[a]];
        let DeleteButton = document.createElement('button');
        Input.parentNode.appendChild(DeleteButton);
        DeleteButton.textContent = 'Borrar';
        DeleteButton.id = 'DelLib' + a;
        DeleteButton.className = 'btn btn-danger';
        DeleteButton.onclick = () => {let result = window.confirm('¿Esta seguro de querer borrar este atributo?');
            if (result){
                books[id].Elements.delete(books[id].ElementsName.splice(a,1));
            
                DeleteButton.parentNode.parentNode.removeChild(DeleteButton.parentNode);
                ResetInfo();
            }
        }
    }

    let AddAtributeButton = document.createElement('button');
    let GroupButtonDiv = document.getElementById('botones');
    GroupButtonDiv.appendChild(AddAtributeButton);
    AddAtributeButton.textContent = 'Añadir atributo'
    AddAtributeButton.className = 'btn btn-warning';
    AddAtributeButton.id = 'b4';
    AddAtributeButton.onclick = () => { showHide('AtributeName');
        showHide('SaveAtributeName');
        showHide('botones');
        showHide('InputsAñadir');
        showHide('Div' + id);
        showHide('DivElem' + id);
        let  Div = document.getElementById('AtributeName');
        let SaveButton = document.createElement('button');
        Div.appendChild(SaveButton);
        SaveButton.textContent = 'Guardar';
        SaveButton.className = 'btn btn-success';
        SaveButton.onclick = () => {
            
            let AtributeInput = document.getElementById('AtributeInput');
            books[id].ElementsName.push(AtributeInput.value);
            let Div = document.getElementById('DivElem' + id);
            let NewInput = document.createElement('Input');
            let NewP = document.createElement('p');
            NewP.textContent = books[id].ElementsName[books[id].ElementsName.length-1] + ': ';
            Div.appendChild(NewP);
            NewP.appendChild(NewInput);
            NewInput.id = 'Lib' + id + books[id].ElementsName[books[id].ElementsName.length-1];
            let DeleteButton = document.createElement('button');
            NewP.appendChild(DeleteButton);
            DeleteButton.textContent = 'Borrar';
            DeleteButton.id = 'DelLib' + books[id].ElementsName.length;
            DeleteButton.className = 'btn btn-danger';
            DeleteButton.onclick = () => {let result = window.confirm('¿Esta seguro de querer borrar este atributo?');
                if (result){
                    books[id].Author[i].Elements.delete(books[id].Author[i].ElementsName.splice(books[id].Author[i].ElementsName.length-1,1));
                
                    DeleteButton.parentNode.parentNode.removeChild(DeleteButton.parentNode);
                    ResetInfo();
                }
            }

            AtributeInput.value = '';
            SaveButton.parentNode.removeChild(SaveButton);
            showHide('AtributeName');
            showHide('SaveAtributeName');
            showHide('botones');
            showHide('InputsAñadir');
            showHide('Div' + id);
            showHide('DivElem' + id);
        }
    }

    

}

function ResetInfo(){
    for(let a=0; a<books.length; a++){
	    let DeletedBookId = document.getElementById('divlibro'+ a);
	    DeletedBookId.parentNode.removeChild(DeletedBookId);
	    addLibroToDOM(books[a],a);
	    if (books.length === 0)
		content.textContent = 'Sin elementos'
    }
}

function AddSubelement(id){
    let Array = [];
    let ISubE = document.getElementById('InputSubE');
    ISubE.style.display = 'block';
    let AddButton = document.getElementById('ASubE');
    AddButton.className = 'btn btn-success';

    let div = document.getElementById('NewAtributes');
    let NewDiv = document.createElement('div');
    div.appendChild(NewDiv);
    NewDiv.id = 'Input' + id + books[id].Author.length+1;
    let NewAtributeButton = document.getElementById('AAtribute');
    NewAtributeButton.onclick = () => AddAtributeSubelement(Array,id)

    AddButton.onclick = () => {ISubE.style.display = 'none';

        let NameInput = document.getElementById('NombreA');
        NewAuthor = new Author(NameInput.value)
        NewAuthor.ElementsName = Array;
        for (let a=0;a<Array.length;a++){
            let ElementContent = document.getElementById('' + id + books[id].Author.length+1 + Array[a])
            if (ElementContent != null)
            NewAuthor.Elements[Array[a]] = ElementContent.value;
        }
        books[id].Author.push(NewAuthor);
        NameInput.value = '';

        for (let a=0;a<=books[id].ElementsName.length;a++){
            let DeleteButton = document.getElementById('DelLib' + a);
            if (DeleteButton != null){
                DeleteButton.parentNode.removeChild(DeleteButton);
            }
        }

	    ResetInfo()
	    showHide('content');
	    showHide('Anadir')
	    MoreInfo(id);
	    showHide('Bot' + id);
        showHide('ASubE');
        showHide('AAtribute');
        showHide(NewDiv.id);
    };   


}

function GetInputValue(input){
    let In = document.getElementById(input)
    In.placeholder = '';
    let value = In.value;
    return value;
}

function DeleteSubelement(id,i){
    let result = window.confirm('¿Esta seguro de querer borrar el autor ' + books[id].Author[i].Name + ' de este libro?');
        if (result){           
		books[id].Author.splice(i,1);
		ResetInfo();
		showHide('content');
		MoreInfo(id);
		showHide('Anadir');
		let button = document.getElementById('b1');
		button.parentNode.removeChild(button);
		let button2 = document.getElementById('b2');
		button2.parentNode.removeChild(button2);
		let AddSubelementButton = document.getElementById('b3');
		AddSubelementButton.parentNode.removeChild(AddSubelementButton);
        button = document.getElementById('b4');
		button.parentNode.removeChild(button);
        Div = document.getElementById('Div' + id)
        Div.parentNode.removeChild(Div);
        let NodeName = document.getElementById('Input' + id + i+1);
        if (NodeName != null)
            NodeName.parentNode.removeChild(NodeName);
		showHide('InputsAñadir');
        showHide('Bot' + id);
        } 
}

function EditSubelement(id,i){
    let NewA = document.getElementById('NewAtributes');
    NewA.style.display = 'block';
    let Div = document.getElementById('Input' + id + i+1);
    Div.style.display = 'block';
    let ISubE = document.getElementById('InputSubE');
    ISubE.style.display = 'block';
    showHide('InputsAñadir');
    let boton = document.getElementById('b1')
	boton.parentNode.removeChild(boton);
	let boton2 = document.getElementById('b2')
	boton2.parentNode.removeChild(boton2);
	let botonAñadirSub = document.getElementById('b3')
    boton = document.getElementById('b4')
	boton.parentNode.removeChild(boton);
	botonAñadirSub.parentNode.removeChild(botonAñadirSub);
    Div = document.getElementById('Div' + id)
    Div.parentNode.removeChild(Div);

    let NameImput = document.getElementById('NombreA');
    NameImput.value = books[id].Author[i].Name;
    for (let a=0;a<books[id].Author[i].ElementsName.length;a++){
        let Input = document.getElementById('' + id + i+1 + books[id].Author[i].ElementsName[a])
        books[id].Author[i].Elements[books[id].Author[i].ElementsName[a]] = Input.value;
        Input.value = books[id].Author[i].Elements[books[id].Author[i].ElementsName[a]];
        let DeleteButton = document.createElement('button');
        Input.parentNode.appendChild(DeleteButton);
        DeleteButton.textContent = 'Borrar';
        DeleteButton.id = 'DB' + a;
        DeleteButton.className = 'btn btn-danger';
        DeleteButton.onclick = () => {let result = window.confirm('¿Esta seguro de querer borrar este atributo?');
            if (result){
                books[id].Author[i].Elements.delete(books[id].Author[i].ElementsName.splice(a,1));
            
                DeleteButton.parentNode.parentNode.removeChild(DeleteButton.parentNode);
                ResetInfo();
            }
        }
    }


    let NewAtributes = document.getElementById('NewAtributes')
    let pGuardar = document.createElement('p')
    NewAtributes.appendChild(pGuardar);
    let botonGuardar = document.createElement('button');
    pGuardar.appendChild(botonGuardar);
    botonGuardar.textContent = 'Guardar'
    botonGuardar.className = 'btn btn-success';
    botonGuardar.onclick = () => {
        for (let a=0;a<=books[id].Author[i].ElementsName.length;a++){
            let DeleteButton = document.getElementById('DB' + a);
            if (DeleteButton != null){
                DeleteButton.parentNode.removeChild(DeleteButton);
            }
            let DeleteButton2 = document.getElementById('DelB' + a);
            if (DeleteButton2 != null){
                DeleteButton2.parentNode.removeChild(DeleteButton2);
            }
        }
        books[id].Author[i].Name = NameImput.value;
        for (let a=0;a<books[id].Author[i].ElementsName.length;a++){
            let Input = document.getElementById('' + id + i+1 + books[id].Author[i].ElementsName[a])
            if (Input != null){
                books[id].Author[i].Elements[books[id].Author[i].ElementsName[a]] = Input.value;
                Input.value = books[id].Author[i].Elements[books[id].Author[i].ElementsName[a]];
            }
        }

        for (let a=0;a<=books[id].ElementsName.length;a++){
            let DeleteButton = document.getElementById('DelLib' + a);
            if (DeleteButton != null){
                DeleteButton.parentNode.removeChild(DeleteButton);
            }
        }

        NameImput.value = '';

        ResetInfo();
		showHide('content');
		MoreInfo(id);
		showHide('Anadir');
        showHide('Bot' + id);
        ISubE.style.display = 'none';
        botonGuardar.parentNode.removeChild(botonGuardar);
        if (document.getElementById('Input' + id + i+1)!==null)
        showHide('Input' + id + i+1);
        AddAtributeButton.parentNode.removeChild(AddAtributeButton);
    }

    let AddAtributeButton = document.createElement('button');
    pGuardar.appendChild(AddAtributeButton);
    AddAtributeButton.textContent = 'Añadir atributo'
    AddAtributeButton.className = 'btn btn-warning';
    AddAtributeButton.onclick = () => { showHide('AtributeName');
        showHide('NewAtributes');
        showHide('InputSubE');
        showHide('SaveAtributeName');
        let  Div = document.getElementById('AtributeName');
        let SaveButton = document.createElement('button');
        Div.appendChild(SaveButton);
        SaveButton.textContent = 'Guardar';
        SaveButton.className = 'btn btn-success';
        SaveButton.onclick = () => {
            
            let AtributeInput = document.getElementById('AtributeInput');
            books[id].Author[i].ElementsName.push(AtributeInput.value);
            let Div = document.getElementById('Input' + id + i + 1);
            let NewInput = document.createElement('Input');
            let NewP = document.createElement('p');
            NewP.textContent = books[id].Author[i].ElementsName[books[id].Author[i].ElementsName.length-1] + ': ';
            Div.appendChild(NewP);
            NewP.appendChild(NewInput);
            NewInput.id = '' + id + i + 1 + books[id].Author[i].ElementsName[books[id].Author[i].ElementsName.length-1];
            let DeleteButton = document.createElement('button');
            NewP.appendChild(DeleteButton);
            DeleteButton.textContent = 'Borrar';
            DeleteButton.id = 'DelB' + books[id].Author[i].ElementsName.length;
            DeleteButton.className = 'btn btn-danger';
            DeleteButton.onclick = () => {let result = window.confirm('¿Esta seguro de querer borrar este atributo?');
                if (result){
                    books[id].Author[i].Elements.delete(books[id].Author[i].ElementsName.splice(books[id].Author[i].ElementsName.length-1,1));
                
                    DeleteButton.parentNode.parentNode.removeChild(DeleteButton.parentNode);
                    ResetInfo();
                }
            }

            AtributeInput.value = '';
            SaveButton.parentNode.removeChild(SaveButton);
            showHide('AtributeName');
            showHide('NewAtributes');
            showHide('InputSubE');
            showHide('SaveAtributeName');
        }

    }

}

function AddAtributeSubelement(Array,id){
    showHide('NewAtributes');
    showHide('InputSubE');
    showHide('ASubE');
    showHide('AAtribute');
    showHide('AtributeName');

    let SaveButton = document.getElementById('SaveAtributeName')
    SaveButton.onclick = () => {
        let AtributeNameIput = document.getElementById('AtributeInput');
        Array.push(AtributeNameIput.value);

        let div = document.getElementById('Input' + id + books[id].Author.length+1);
        let NewP = document.createElement('p');
        div.appendChild(NewP);
        NewP.textContent = AtributeNameIput.value + ': ';
        let NewInput = document.createElement('input');
        NewInput.id = '' + id + books[id].Author.length+1 + AtributeNameIput.value;
        NewP.appendChild(NewInput);
        NewInput.parentNode.id = AtributeNameIput.value;
        /*let DeleteButton = document.createElement('button');
        NewP.appendChild(DeleteButton);
        DeleteButton.textContent = 'Borrar';
        let i = libros[id].Autores.length-1;
        DeleteButton.onclick = () => {
            DeleteButton.parentNode.parentNode.removeChild(DeleteButton.parentNode)
            ResetInfo();
        }*/

        showHide('InputSubE');
        showHide('ASubE');
        showHide('AAtribute');
        showHide('AtributeName')
        showHide('NewAtributes');
        AtributeNameIput.value = '';
    }


}

function AddAtribute(Array){
    showHide('AtributeName');
    showHide('InputsAñadir');
    showHide('NL');
    showHide('AddAtribute');
    let SaveButton = document.getElementById('SaveAtributeName');
    SaveButton.onclick = () => {
        let NameInput = document.getElementById('AtributeInput');
        Array.push(NameInput.value);

        let div = document.getElementById('DivElem' + books.length);
        let NewP = document.createElement('p');
        div.appendChild(NewP);
        NewP.textContent = NameInput.value + ': ';
        let NewInput = document.createElement('input');
        NewInput.id = 'Lib'+ books.length + NameInput.value;
        NewP.appendChild(NewInput);
        NewInput.parentNode.id = NameInput.value;
        NameInput.value = '';

        showHide('AtributeName');
        showHide('InputsAñadir');
        showHide('NL');
        showHide('AddAtribute');
    }
}