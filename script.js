class Book {
    constructor(title, author, pages, haveRead = false) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }

    get info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead}`;
    }


    changeStatus() {
        this.haveRead ? this.haveRead = false : this.haveRead = true;
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    get books() {
        return this.library
    }

    addBookToLibrary(title, author, pages, haveRead) {
        let newBook = new Book(title, author, pages, haveRead);
        this.library.push(newBook);
    }

    removeBook(book_id) {
        for (this.book of this.library) {
            if (this.book['id'] == book_id) {
                let index = this.library.indexOf(this.book);
                this.library.splice(index, 1)
            }
        }
    }


}


class displayLibrary {
    constructor(library) {
        this.library = library;
    }
    libraryContainer = document.querySelector('.books-container');

    displayBooks() {
        for (let book of this.library.books) {
            let card = document.createElement('div')
            card.className = 'card';
            this.libraryContainer.appendChild(card)

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
            book['haveRead'] ? 'Read' : 'Unread';
            let statusText = '';
            let state = '';

            if (book['haveRead']) {
                statusText = 'Read'
                status.classList = 'status read';
            } else {
                statusText = 'Unread';
                status.classList = 'status unread';
            }
            // status.innerHTML = `Status: <span>${(book['haveRead'] ? 'Read' : 'Unread')}</span>`
            status.innerHTML = `Status: <span>${statusText}</span>`
            // status.style.color = 'blue';
            card.appendChild(status);

            let removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'removeBtn';
            removeBtn.id = book['id'];


            let statusBtn = document.createElement('button');
            if (book.haveRead) {
                statusBtn.textContent = 'Mark as Unread';
            } else {
                statusBtn.textContent = 'Mark as Read';
            }
            statusBtn.id = book.id;
            book.haveRead ? statusBtn.classList = 'statusBtn' : statusBtn.classList = 'statusBtn active'
            card.appendChild(statusBtn);



            card.appendChild(removeBtn);
            this.addEventToButtons(removeBtn, statusBtn);

        }


    }


    addEventToButtons(removeBtn, statusBtn) {
        statusBtn.addEventListener('click', (event) => {
            this.toggleStatus(event.target.id);
            this.updateLibrary();
        })

        removeBtn.addEventListener('click', event => {
            this.library.removeBook(event.target.id);
            
            this.updateLibrary();
        })
    }


    updateLibrary() {
        this.libraryContainer.replaceChildren();
        this.displayBooks();
    }

    toggleStatus(book_id) {
        for (let book of this.library.books) {
            if (book['id'] == book_id) {
                book.changeStatus();
            }
        }
    }

    addBook(library) {

        let addBtn = document.querySelector("#addBook");
        addBtn.addEventListener('click', (event) => {
            event.preventDefault();


            let form = document.querySelector('#form');
            let title = document.querySelector('#title').value;
            let author = document.querySelector('#author').value;
            let pages = document.querySelector('#pages').value;
            let haveRead = document.querySelector("input[name='status']:checked")?.value;

            library.addBookToLibrary(title, author, pages, haveRead);
            console.log(library);
            
            this.updateLibrary();
            form.reset();
        })
    }
}
const myLibrary = new Library();
myLibrary.addBookToLibrary('Prey', 'Michael Crichton', 502, true)

const display = new displayLibrary(myLibrary)

myLibrary.addBookToLibrary('Another Book', 'frozerated', 203)
myLibrary.addBookToLibrary('The Lincoln Lawyer ', 'Michael Connelly', 489, true)
myLibrary.addBookToLibrary('This is yet another book', 'The amazing author', 259)

display.addBook(myLibrary);
display.displayBooks();