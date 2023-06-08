const NUM_RESULTS = 5;

let loadMoreRequests = 0;

async function loadMore(){

    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;

    const response = await fetch(`/books?from=${from}&to=${to}`);

    const newBooks = await response.text();
  
    const booksDiv = document.getElementById("books");

    booksDiv.innerHTML += newBooks;

    loadMoreRequests++;
}

function deleteBookAlert(id){
    if (window.confirm("¿Está seguro de que quiere borrar este libro?")){
        window.location.href=`/book/${id}/delete`;
    }
}

function deleteAuthorAlert(idBook,idAuthor){
    if (window.confirm("¿Está seguro de que quiere borrar este autor del libro?")){
        window.location.href=`/book/${idBook}/author/${idAuthor}/delete`;
    }
}
