const addBookBtn = document.getElementById("add-book-btn");
const booksContainer = document.getElementById("books");
const modalContainer = document.getElementById("modal");
const form = document.getElementById("book-form");

//let myLibrary = [];
let myLibrary = [
  {
    name: "Book 1",
    author: "Author 1",
    pages: 321,
    read: false,
    id: generateId(),
  },
  {
    name: "Book 2",
    author: "Author 2",
    pages: 155,
    read: true,
    id: generateId(),
  },
  {
    name: "Book 3",
    author: "Author 3",
    pages: 72,
    read: true,
    id: generateId(),
  },
  {
    name: "Book 4",
    author: "Author 4",
    pages: 1026,
    read: false,
    id: generateId(),
  },
];

function Book({ name, author, pages, read }) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = generateId();
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

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = book.read ? "Mark unread" : "Mark read";
    toggleReadBtn.addEventListener("click", () => {
      myLibrary = myLibrary.map((libraryBook) => {
        if (libraryBook.id === book.id)
          return { ...libraryBook, read: !libraryBook.read };
        return libraryBook;
      });
      removeAllChildren(booksContainer);
      updateBooksDisplay();
    });

    div.appendChild(toggleReadBtn);

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
