const myLibrary = [];
const addABookButton = document.querySelector("#add-button");
const bookGrid = document.querySelector("#book-grid");
bookGrid.style.cssText = `display: none;`;

//create a book object
function Book(title, author, pageCount, isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;

  this.getDetails = function () {
    return `${this.title} ${this.author} ${this.pageCount} ${this.isRead}`;
  };
}

//push a book object in myLibrary array
function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

//makes cards of each book object and display it on the book grid
function loadAllCards() {
  for (let i = 0; i < myLibrary.length; i++) {
    loadCard(myLibrary[i]);
  }
  if(myLibrary.length == 0){
    bookGrid.style.cssText = `display: none;`;
  }
}

/* 
    sets up a form to enter book details (to make a card of it)
    submit button makes a book object and stores it in myLibrary array
    a new card of the book object is generated (fn: loadCard() ) and displayed
*/
function setUpForm() {
  const dialog = document.querySelector("dialog");
  const closeButton = document.querySelector("#close-button");

  const bookInput = document.querySelector("#book-title");
  const authorInput = document.querySelector("#book-author");
  const pageCountInput = document.querySelector("#page-count");
  const isReadInput = document.querySelector("#is-read");
  const submitButton = document.querySelector("#submit-button");

  submitButton.addEventListener("click", () => {
    let bookTitle = bookInput.value;
    let bookAuthor = authorInput.value;
    let pageCount = pageCountInput.value;
    let isRead = isReadInput.checked;
    console.log(isRead);

    const book = new Book(bookTitle, bookAuthor, pageCount, isRead);
    addBookToLibrary(book);

    //reset textfields of dialog
    bookInput.value = "";
    authorInput.value = "";
    pageCountInput.value = "";
    isReadInput.checked = false;

    console.log(myLibrary);
    dialog.close();
    loadCard(book);
  });

  //show the form as a dialog
  addABookButton.addEventListener("click", () => {
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });
}

//creates a new book card and appends it in the card grid
function loadCard(book) {
  const bookCard = document.createElement("div");
  bookCard.style.cssText = `
    border: 2px solid black;
    box-shadow: 10px 10px 16px 0 rgba(0,0,0,0.9);
    background-color: rgb(228, 197, 158);
    border-radius: 8px;
    color: rgb(128, 61, 59);
    font-weight: 800;
    font-size: 1.2rem;
    width: auto;
    height: auto;
    padding: 20px;
    display: grid;
    gap: 10px;
    text-align: center;
    margin: 20px;`;

  const bookTitle = document.createElement("p");
  bookTitle.textContent = "Title: " + book.title;
  bookCard.appendChild(bookTitle);
  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = "By: " + book.author;
  bookCard.appendChild(bookAuthor);
  const bookPageCount = document.createElement("p");
  bookPageCount.textContent = book.pageCount + " pages";
  bookCard.appendChild(bookPageCount);

  const isReadDiv = document.createElement("div");
  isReadDiv.style.cssText = `
  display: flex;`;

  const bookIsReadLabel = document.createElement("label");
  bookIsReadLabel.textContent = "Has been read? : ";
  const bookIsRead = document.createElement("input");
  bookIsRead.setAttribute("type", "checkbox");

  if (book.isRead) {
    bookIsRead.checked = true;
  } else {
    bookIsRead.checked = false;
  }

  bookIsRead.addEventListener("change", () => {
    const i = myLibrary.findIndex(function (element) {
      return element === book;
    });
    if (bookIsRead.checked) {
      myLibrary[i].isRead = true;
    } else {
      myLibrary[i].isRead = false;
    }
  });

  isReadDiv.appendChild(bookIsReadLabel);
  isReadDiv.appendChild(bookIsRead);
  bookCard.appendChild(isReadDiv);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  /* deletes the book object from myLibrary array
    clears the card grid and recreates cards of all book objects in myLibrary array  
  */
  deleteButton.addEventListener("click", () => {
    const i = myLibrary.findIndex(function (element) {
      return element === book;
    });
    myLibrary.splice(i, 1);
    for (let i = 0; i < myLibrary.length; i++) {
      console.log(myLibrary[i].getDetails());
    }
    bookGrid.innerHTML = "";
    loadAllCards();
  });

  bookCard.appendChild(deleteButton);

  bookGrid.appendChild(bookCard);
  bookGrid.style.cssText = `
      width: 100vw;
      height: 100%;
      background-color: rgb(50, 44, 43);
      color: rgb(228, 197, 158);
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);`;
}

setUpForm();
