const myLibrary = [];
const addABookButton = document.querySelector("#add-button");
const bookGrid = document.querySelector("#book-grid");
bookGrid.style.cssText = `display: none;`;

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

function loadAllCards(){
  for (let i = 0; i < myLibrary.length; i++) {
    loadCard(myLibrary[i]);
  }
}

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
  const bookIsRead = document.createElement("p");
  bookIsRead.textContent = "Has been read? : " + book.isRead;
  bookCard.appendChild(bookIsRead);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", ()=>{
    const i = myLibrary.findIndex(function(element){
      return element === book;
    });
    myLibrary.splice(i, 1);
    for(let i=0; i<myLibrary.length; i++){
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


// myLibrary.push(new Book("Hatyaara", "SMP", 600, "Yes"));
// myLibrary.push(new Book("Bichauliya", "SMP", 110, "No"));
// myLibrary.push(new Book("The 5Am Club", "Robin Sharma", 600, "Yes"));
// myLibrary.push(new Book("Courage is calling", "Ryan holiday", 600, "Yes"));
// myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 600, "No"));
// myLibrary.push(new Book("The Krishna Key", "SMPAshwin Sanghi", 1200, "Yes"));

setUpForm();