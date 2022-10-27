//const addBookBtn = document.getElementById("add-book-btn");
//const booksContainer = document.getElementById("books");
//const modalContainer = document.getElementById("modal");
//const form = document.getElementById("book-form");
const booksContainer = document.querySelector(".main-flex");

//let myLibrary = [];
let myLibrary = [
  {
    title: "Book 1",
    author: "Author 1",
    pages: 321,
    read: false,
    id: generateId(),
  },
  {
    title: "Book 2",
    author: "Author 2",
    pages: 155,
    read: true,
    id: generateId(),
  },
  {
    title: "Book 3",
    author: "Author 3",
    pages: 72,
    read: true,
    id: generateId(),
  },
  {
    title: "Book 4",
    author: "Author 4",
    pages: 1026,
    read: false,
    id: generateId(),
  },
];

function Book({ title, author, pages, read }) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = generateId();
}

/* 
function addBookToLibrary(book) {
  myLibrary.push(book);
  removeAllChildren(booksContainer);
  updateBooksDisplay();
}
 */

function updateBooksDisplay() {
  myLibrary.forEach((book) => {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    bookContainer.setAttribute("data-id", book.id);

    function eyeIconFunc() {
      myLibrary = myLibrary.map((libraryBook) => {
        if (libraryBook.id === book.id)
          return { ...libraryBook, read: !libraryBook.read };
        return libraryBook;
      });
      removeAllChildren(booksContainer);
      updateBooksDisplay();
    }

    function xIconFunc() {
      myLibrary = myLibrary.filter((libraryBook) => libraryBook.id !== book.id);
      removeAllChildren(booksContainer);
      updateBooksDisplay();
    }

    const title = bookElementGenerator.title(book.title);
    const author = bookElementGenerator.author(book.author);
    const pages = bookElementGenerator.pages(book.pages);
    const read = bookElementGenerator.read(book.read);
    const buttons = bookElementGenerator.buttons({ eyeIconFunc, xIconFunc });

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookContainer.appendChild(buttons);

    booksContainer.appendChild(bookContainer);
  });
}

function removeAllChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}
/* 
function toggleForm() {
  modalContainer.classList.toggle("hide");
}
 */
/* 
function handleFormSubmit() {
  const inputs = Array.from(form.getElementsByTagName("input"));
  const obj = {};
  inputs.forEach((input) => {
    if (input.type === "checkbox") {
      obj[input.name] = input.checked;
    } else {
      obj[input.name] = input.value;
    }
  });
  const newBook = new Book(obj);
  addBookToLibrary(newBook);
}
 */
/* 
function resetForm() {
  const inputs = Array.from(form.getElementsByTagName("input"));
  inputs.map((input) => {
    if (input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
}
 */
/* 
addBookBtn.addEventListener("click", toggleForm);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleFormSubmit();
  resetForm();
  toggleForm();
});
 */

function generateId() {
  return crypto.randomUUID();
}

const bookElementGenerator = (() => {
  function title(bookTitle) {
    const div = document.createElement("div");
    div.textContent = bookTitle;
    div.classList.add("book-title");
    return div;
  }
  function author(bookAuthor) {
    const div = document.createElement("div");
    div.textContent = `by ${bookAuthor}`;
    div.classList.add("book-author");
    return div;
  }
  function pages(bookPages) {
    const div = document.createElement("div");
    div.textContent = `${bookPages} pages`;
    div.classList.add("book-pages");
    return div;
  }
  function read(bookRead) {
    const div = document.createElement("div");
    div.textContent = bookRead
      ? "You've read this book."
      : "You haven't read this book yet.";
    div.classList.add("book-read");
    return div;
  }
  function buttons({ xIconFunc, eyeIconFunc }) {
    const xIconButton = document.createElement("button");
    const xIcon = document.createElement("img");
    xIcon.src = "./icons/x.svg";
    xIcon.alt = "x icon";
    xIcon.classList.add("x-icon");
    xIconButton.addEventListener("click", xIconFunc);
    xIconButton.appendChild(xIcon);

    const eyeIconButton = document.createElement("button");
    const eyeIcon = document.createElement("img");
    eyeIcon.src = "./icons/eye.svg";
    eyeIcon.alt = "eye icon";
    eyeIconButton.addEventListener("click", eyeIconFunc);
    eyeIconButton.appendChild(eyeIcon);

    const container = document.createElement("div");
    container.classList.add("book-buttons");

    container.appendChild(eyeIconButton);
    container.appendChild(xIconButton);

    return container;
  }
  return { title, author, pages, read, buttons };
})();

updateBooksDisplay();
