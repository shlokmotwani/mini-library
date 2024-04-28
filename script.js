const myLibrary = [];
const addABookButton = document.querySelector("#add-button");
const bookGrid = document.querySelector("#book-grid");
bookGrid.style.cssText = `
width: 100vw;
background-color: rgba(3, 252, 173, 0.3);
display: grid;
grid-auto-flow: row;
grid-template-columns: repeat(5, 1fr);`;

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

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

function setUpForm() {
  for(let i=0; i<myLibrary.length; i++){
    loadCard(myLibrary[i]);
  }

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
    let isRead = isReadInput.value;

    const book = new Book(bookTitle, bookAuthor, pageCount, isRead);
    addBookToLibrary(book);

    //reset textfields of dialog
    bookInput.value = "";
    authorInput.value = "";
    pageCountInput.value = "";
    isReadInput.value = "";

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

function loadCard(book){
  
    const bookCard = document.createElement("div");
    bookCard.style.cssText = `
    border: 2px solid black;
    border-radius: 8px;
    color: white;
    font-size: 1.2rem;
    width: 180px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 20px;
    align-items: center;`;

    const bookTitle = document.createElement("p");
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = book.author;
    bookCard.appendChild(bookAuthor);
    const bookPageCount = document.createElement("p");
    bookPageCount.textContent = book.pageCount;
    bookCard.appendChild(bookPageCount);
    const bookIsRead = document.createElement("p");
    bookIsRead.textContent = book.isRead;
    bookCard.appendChild(bookIsRead);

    bookGrid.appendChild(bookCard);
}

// myLibrary.push(new Book("The 5AM Club", "Robin Sharma", 600, "Yes"));
// myLibrary.push(new Book("Jaadugarni", "Surendra Mohan Pathak", 240, "No"));
setUpForm();