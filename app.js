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
    // hard coded values for testing only
    const StoredBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: 365467
      },
      {
        title: 'Book Two',
        author: 'Jane Doe',
        isbn: 9877543
      }
    ];
    
    // assign temporary hard coded books array to var 'books'
    const books = StoredBooks;

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


  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }


}

// Store Class: Handles Storage

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

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Add book to UI
  UI.addBookToList(book);

  // Clear form fields
  UI.clearFields();


});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
})