const addBookBtn = document.getElementById("add-book-btn");
const booksContainer = document.getElementById("books");
const modalContainer = document.getElementById("modal");

const myLibrary = [];

function Book({ name, author, pages, read }) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  removeAllChildren(booksContainer);
  updateBooksDisplay();
}

function updateBooksDisplay() {
  myLibrary.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("book");
    div.textContent = `${book.name} / ${book.author} / ${book.pages} pages / ${
      book.read ? "read" : "unread"
    }`;
    booksContainer.appendChild(div);
  });
}

function removeAllChildren(node) {
  while (node.hasChildElements) {
    node.removeChild(node.lastChild);
  }
}

function toggleForm() {
  modalContainer.classList.toggle("hide");
}

addBookBtn.addEventListener("click", toggleForm);
