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
let theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 259,  true)
// console.log(theHobbit.info());
// console.log(theHobbit.id);



function addBookToLibrary(title, author, pages, haveRead){
  let newBook = new Book(title, author, pages, haveRead)
  myLibrary.push(newBook);
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 259,  true)
console.log(myLibrary);

//Generate unique ID
//Create book from the arguments of the function
//Store the new book object into the array`