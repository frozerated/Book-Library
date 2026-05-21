let myLibrary = [];


function Book(title, author, pages, haveRead=false){
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;

  this.info = function(){
    this.haveRead = this.haveRead ? 'have read' : 'not read yet';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead}`;
  }
}

function addBookToLibrary(title, author, pages, haveRead){
  let newBook = new Book(title, author, pages, haveRead)
  myLibrary.push(newBook);
}


function displayBooks(){
    let library = document.querySelector('.books-container');
    for(book of myLibrary){
        card = document.createElement('div')
        card.className = 'card';
        library.appendChild(card)

        let bookInfo = document.createElement('p');
        bookInfo.textContent = book.info();
        card.appendChild(bookInfo);
    }
}



// Temporary (For viewing display result)
addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 259,  true)
addBookToLibrary('The Book', 'The amazing author', 259)
console.log(myLibrary);


displayBooks();