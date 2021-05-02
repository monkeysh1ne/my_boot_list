// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks(){
    const books = Store.getBooks();
    
    
     books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book){
    // 'book-list' is ID for tbody element in DOM
    const list = document.querySelector('#book-list');

    // create new row for each book entry in store
    const row = document.createElement('tr');

    // populate new row with extracted book entry data
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-sm btn-danger delete">X</a></td>
    `;

    list.appendChild(row);
  }
  static deleteBook(el){
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className){
    // dynamically create a ne div to insert into DOM for displaying UI messages
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish alerts after 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }


  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }


}

// Store Class: Handles Storage

class Store {
  
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    
    books.push(book);
    // NB: localStorage requites STRING input so convert books from array to string using JSON stringify.

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

  // prevent default submit action
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === ''){
    UI.showAlert('Please fill in all the fields.', 'danger');

  } else {
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to Store
    Store.addBook(book);

    // Clear form fields
    UI.clearFields();

    // Show alert confirming successfully added in UI
    UI.showAlert('Book successfully added.', 'success');
    }





});

// Event: Remove a Boo
// NB: targets tbody element #book-list to ensure removing ROW not just delete anchor!
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);
  UI.showAlert('Book successfully removed.', 'success');

  // Remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

})