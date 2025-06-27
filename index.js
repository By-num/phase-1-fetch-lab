async function fetchBooks() {
  const resp = await fetch('https://anapioficeandfire.com/api/books');
  const json = await resp.json();
  renderBooks(json);
  // To pass the tests, don't forget to return your fetch!
  return resp;
}

function fetchBooks() {
  return fetch('https://anapioficeandfire.com/api/books')
    .then(resp => resp.json())
    .then(json => {
      renderBooks(json);
    });
}

function renderBooks(books) {
  const main = document.querySelector('main');
  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.textContent = book.name;
    main.appendChild(h2);
  });
}

document.addEventListener('DOMContentLoaded', fetchBooks);
