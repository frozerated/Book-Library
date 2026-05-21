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
