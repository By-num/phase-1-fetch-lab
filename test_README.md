// test_README.md

require('./helpers.js');

const sinon = require('sinon');
const helpers = require('./helpers');
const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

describe("index.js", () => {
  describe('fetchBooks()', () => {

    beforeEach(() => {
      window.document.body.innerHTML = '<main></main>';
      window.fetch = require('node-fetch');
    });

    it("sends a fetch request to 'https://anapioficeandfire.com/api/books'", async () => {
      chai.spy.on(window, 'fetch');
      await fetchBooks();
      expect(window.fetch, "A fetch to the API was not found")
        .to.have.been.called.with('https://anapioficeandfire.com/api/books');
    });

    it("renders book titles into the DOM by passing a JSON object to renderBooks()", async () => {
      chai.spy.on(window, 'renderBooks');
      await fetchBooks().then(() => {
        expect(window.renderBooks).to.have.been.called();
      });
    });

  });
});
describe("README.md", () => {
  const fs = require('fs');
  const path = require('path');
  const readmePath = path.join(__dirname, 'README.md');
  const readme = fs.readFileSync(readmePath, 'utf8');

  it("includes a 'Learning Goals' section with the correct goal", () => {
    expect(readme).to.match(/## Learning Goals/);
    expect(readme).to.include('Use `fetch()` to programmatically make a web request');
  });

  it("explains what an API is", () => {
    expect(readme).to.match(/### What's an API\?/);
    expect(readme).to.match(/An \*\*API\*\*, or application programming interface/);
  });

  it("explains what JSON is", () => {
    expect(readme).to.match(/### What's JSON\?/);
    expect(readme).to.match(/\*\*JSON\*\* is a language-agnostic way of formatting data/);
  });

  it("provides the correct fetch example code", () => {
    expect(readme).to.include('fetch("https://anapioficeandfire.com/api/books")');
    expect(readme).to.include('.then((resp) => resp.json())');
    expect(readme).to.include('.then((json) => console.log(json));');
  });

  it("includes a 'Deliverables' section describing fetchBooks()", () => {
    expect(readme).to.match(/## Deliverables/);
    expect(readme).to.include('In `index.js`, there is an empty function, `fetchBooks()`');
    expect(readme).to.include('fetch request to the Game of Thrones API');
    expect(readme).to.include('call the second function, `renderBooks()`, passing in the JSON-ified data');
  });

  it("includes a 'Resources' section with correct links", () => {
    expect(readme).to.match(/## Resources/);
    expect(readme).to.include('[Game of Thrones API][got]');
    expect(readme).to.include('[MDN: Using Fetch][fetch]');
    expect(readme).to.include('[got]: https://anapioficeandfire.com/');
    expect(readme).to.include('[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch');
  });
});