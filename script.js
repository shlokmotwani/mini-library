const myLibrary = [];

function Book(title, author, pageCount, isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;

  this.getDetails = function(){
    return `${this.title} ${this.author} ${this.pageCount} ${this.isRead}`
  }

}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

const addABookButton = document.querySelector("#add-button");
const bookInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const pageCountInput = document.querySelector("#page-count");
const isReadInput = document.querySelector("#is-read");
const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click", ()=>{
    let bookTitle = bookInput.value;
    let bookAuthor = authorInput.value;
    let pageCount = pageCountInput.value;
    let isRead = isReadInput.value;

    const book = new Book(bookTitle,
        bookAuthor,
        pageCount,
        isRead);
    addBookToLibrary(book);

    for(let i=0; i<myLibrary.length; i++){
        console.log(myLibrary[i].getDetails());
    }

    dialog.close();
})


let fiveAMClub = new Book("The 5 AM Club",
"Robin Sharma",
350,
true);

myLibrary.push(fiveAMClub);

for(let i=0; i<myLibrary.length; i++){
    console.log(myLibrary[i].getDetails());
}

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("#close-button");

//show the form as a dialog
addABookButton.addEventListener("click", ()=>{
    dialog.showModal();
});

closeButton.addEventListener("click", ()=>{
    dialog.close();
})