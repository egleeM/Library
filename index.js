const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() 
{
    this.read = !this.read;
};


function addBookToLibrary(event) 
{
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    if (title && author && pages) 
    {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        displayBooks(); 
        clearForm();
    } 
    else 
    {
        alert("Please fill out all fields.");
    }
}

function displayBooks() 
{
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => { 
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-item');
        bookCard.setAttribute('data-index', index); 
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <button class="toggle-read">Change Read Status</button>
            <button class="remove-book">Remove Book</button>
        `;

        bookList.appendChild(bookCard);

        bookCard.querySelector('.toggle-read').addEventListener('click', () => {
            book.toggleReadStatus(); 
            displayBooks(); 
        });

        bookCard.querySelector('.remove-book').addEventListener('click', () => {
            myLibrary.splice(index, 1); 
            displayBooks(); 
        });
    });
}

function clearForm() 
{
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
}


document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('bookList');
    const bookFormContainer = document.getElementById('bookFormContainer');
    const newBookBtn = document.getElementById('newBookBtn');
    const bookForm = document.getElementById('bookForm');

    newBookBtn.addEventListener('click', () => 
    {
        bookFormContainer.style.display = 'block';
    });

    bookForm.addEventListener('submit', addBookToLibrary);
});

