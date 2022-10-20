const addBookBtn = document.getElementById("add-book-btn");
const booksContainer = document.getElementById("books");
const modalContainer = document.getElementById("modal");
const form = document.getElementById("book-form");

const myLibrary = [
  {
    name: "Big Book",
    author: "John Doe",
    pages: 132,
    read: false,
    id: generateId(),
  },
];

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
    div.setAttribute("data-id", book.id);
    div.textContent = `${book.name} / ${book.author} / ${book.pages} pages / ${
      book.read ? "read" : "unread"
    }`;
    booksContainer.appendChild(div);
  });
}

function removeAllChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function toggleForm() {
  modalContainer.classList.toggle("hide");
}

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
  resetForm();
  toggleForm();
}

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

addBookBtn.addEventListener("click", toggleForm);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleFormSubmit();
});

function generateId() {
  return crypto.randomUUID();
}

updateBooksDisplay();
