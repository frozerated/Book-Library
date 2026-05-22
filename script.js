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

let library = document.querySelector('.books-container');
function displayBooks(){
    
    for(book of myLibrary){
        card = document.createElement('div')
        card.className = 'card';
        library.appendChild(card)

        let header = document.createElement('h2');
        header.textContent = book['title']
        card.appendChild(header);

        let author = document.createElement('p');
        author.innerHTML = `Author: <u> ${book['author']} </u>`;
        card.appendChild(author)
        
        let pages = document.createElement('p');
        pages.textContent = `Pages: ${book['pages']}`;
        card.appendChild(pages);

        let status = document.createElement('p');
        status.innerHTML = `Status: <span>${(book['haveRead'] ? 'Read' : 'Unread')}</span>`
        card.appendChild(status);

        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'removeBtn';
        removeBtn.id = book['id'];
        card.appendChild(removeBtn);

        let statusBtn = document.createElement('button');
        if(book.haveRead){
            statusBtn.textContent = 'Mark as Unread';
        }else{
            statusBtn.textContent = 'Mark as Read';
        }
        statusBtn.id = book.id;
        book.haveRead ? statusBtn.classList = 'statusBtn' : statusBtn.classList = 'statusBtn active'
        card.appendChild(statusBtn);


        addEventToButtons(removeBtn, statusBtn);
        
    }
}


function addBook(){
    
    let addBtn = document.querySelector("#addBook");
    addBtn.addEventListener('click', (event)=>{
        event.preventDefault();

        let form = document.querySelector('#form');
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let haveRead = document.querySelector("input[name='status']:checked")?.value;

        addBookToLibrary(title, author, pages, haveRead);
        updateLibrary();
        form.reset();
    })
}

function updateLibrary(){
    library.replaceChildren();
    displayBooks();
}

function addEventToButtons(removeBtn, statusBtn){
    statusBtn.addEventListener('click', (event)=>{
        toggleStatus(event.target.id);
        updateLibrary();
    })

    removeBtn.addEventListener('click', event =>{
        removeBook(event.target.id);
        updateLibrary();
    })
}


function toggleStatus(book_id){
    for(book of myLibrary){
        if(book['id'] == book_id){
            book.changeStatus();
        }
    }
}

Book.prototype.changeStatus = function(){
    this.haveRead ? this.haveRead = false : this.haveRead =true;
}

function removeBook(book_id){
    // console.log(book_id);
    for(book of myLibrary){
        if(book['id'] == book_id){
            let index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
        }
    }
}

addBook();
// Temporary (For viewing display result)
addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 259,  true)
addBookToLibrary('The Book', 'The amazing author', 259)
addBookToLibrary('The Book', 'The amazing author', 259)
addBookToLibrary('The Book', 'The amazing author', 259)
console.log(myLibrary);
displayBooks();
// addEventToButtons();