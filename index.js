//const booksContainer = document.getElementById("books");
//const form = document.getElementById("book-form");
const elements = (() => {
  const booksContainer = document.querySelector(".main-flex");

  function getBooksContainer() {
    return booksContainer;
  }

  return {
    getBooksContainer,
  };
})();

const formElements = (() => {
  const form = document.querySelector("form");
  const checkbox = document.querySelector("input[type='checkbox']");
  const customCheckbox = document.querySelector(".custom-checkbox");
  const customCheckboxLabel = document.querySelector(
    ".input-container.checkbox label"
  );
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readCheckbox = document.getElementById("read");

  function getForm() {
    return form;
  }

  function getCheckbox() {
    return checkbox;
  }

  function getCustomCheckbox() {
    return customCheckbox;
  }

  function getCustomCheckboxLabel() {
    return customCheckboxLabel;
  }

  function getTitleInput() {
    return titleInput;
  }

  function getAuthorInput() {
    return authorInput;
  }

  function getPagesInput() {
    return pagesInput;
  }

  function getReadCheckbox() {
    return readCheckbox;
  }

  return {
    getForm,
    getCheckbox,
    getCustomCheckbox,
    getCustomCheckboxLabel,
    getTitleInput,
    getAuthorInput,
    getPagesInput,
    getReadCheckbox,
  };
})();

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

function updateBooksDisplay() {
  myLibrary.forEach((book) => {
    const booksContainer = elements.getBooksContainer();
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

function addBookToLibrary(book) {
  myLibrary.push(book);
  removeAllChildren(elements.getBooksContainer());
  updateBooksDisplay();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const obj = {
    title: formElements.getTitleInput().value,
    author: formElements.getAuthorInput().value,
    pages: formElements.getPagesInput().value,
    read: formElements.getCheckbox().checked,
  };

  const newBook = new Book(obj);
  addBookToLibrary(newBook);
  resetForm();
}

function resetForm() {
  formElements.getTitleInput().value = "";
  formElements.getAuthorInput().value = "";
  formElements.getPagesInput().value = "";
  checkboxStuff.reset();
}

formElements.getForm().addEventListener("submit", handleFormSubmit);

const checkboxStuff = (() => {
  function click(e) {
    e.preventDefault();
    const checkbox = formElements.getCheckbox();
    checkbox.click();
    updateCustomCheckbox(checkbox.checked);
  }

  function reset() {
    const checkbox = formElements.getCheckbox();
    checkbox.checked = false;
    updateCustomCheckbox(checkbox.checked);
  }

  function updateCustomCheckbox(isChecked) {
    const customCheckbox = formElements.getCustomCheckbox();
    if (!isChecked) {
      customCheckbox.classList.remove("checked");
    } else {
      customCheckbox.classList.add("checked");
    }
  }

  return { click, reset };
})();

formElements.getCustomCheckbox().addEventListener("click", checkboxStuff.click);
formElements
  .getCustomCheckboxLabel()
  .addEventListener("click", checkboxStuff.click);
