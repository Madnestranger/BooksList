const data = [];
const random_words_for_book_name = ['Don', 'Quixote', 'In', 'Search', 'Of', 'Lost', 'Time', 'Harry', 'Potter', 'Lord', 'Of', 'The', 'Rings',
    'Ulysses', 'The', 'Great', 'Gatsby', 'Moby', 'Dick', 'Hamlet', 'War', 'And', 'Peace'];
const random_names_and_surnames_for_author = ['John', 'Wick', 'Anna', 'Herman', 'Ronaldinho', 'Andriy', 'Shevchenko', 'Boris',
    'Britva', 'Taras', 'Korytsia', 'Ivan', 'Zaporozhets'];
const genres = ['horror', 'finance', 'fantastic', 'science fiction'];
const words_for_book_array_length = random_words_for_book_name.length - 1;
const words_for_author_array_length = random_names_and_surnames_for_author.length - 1;
const words_for_genres_array_length = genres.length - 1;

function Book(name, author, date, genre) {
    this.name = name;
    this.author = author;
    this.date = date;
    this.genre = genre;
}

function Author(name, gender) {
    this.name = name;
    this.gender = gender;
}

function compareByName(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

function returnRandomIndex(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function returnFormattedDate(date) {
    const returnedDate = new Date(date);
    return `${returnedDate.getDate()}/${(returnedDate.getMonth() + 1)}/${returnedDate.getFullYear()}`;
}

function fillGenreSelect() {
    var select = document.getElementById('genre-select');
    for (var element in genres) {
        var opt = document.createElement("option");
        opt.value = genres[element];
        opt.innerHTML = genres[element];
        select.appendChild(opt);
    }
}

fillGenreSelect();

var t0 = performance.now();
for (var i = 0; i < 1000000; i++) {
    const genre = genres[returnRandomIndex(0, words_for_genres_array_length)];
    const newAuthor = new Author(`${random_names_and_surnames_for_author[returnRandomIndex(0, words_for_author_array_length)]} ${random_names_and_surnames_for_author[returnRandomIndex(0, words_for_author_array_length)]}`, returnRandomIndex(0, 1));
    const newBook = new Book(`${random_words_for_book_name[returnRandomIndex(0, words_for_book_array_length)]} ${random_words_for_book_name[returnRandomIndex(0, words_for_book_array_length)]}`,
        newAuthor, returnFormattedDate(returnRandomIndex(0, +new Date())), genre);
    data.push(`<div><span>${i + 1}</span>
          <span>${newBook.name}</span>
          <span${newBook.author.gender === 1 ? ' class="male"' : ' class="female"'}>${newBook.author.name}</span>
          <span${newBook.genre === 'horror' ? ' class="horror"' : newBook.genre === 'finance' ? ' class="finance"' : ''}>${newBook.genre}</span>
          <span>${newBook.date}</span></div>`);
}
var t1 = performance.now();
console.log("Time to generate 1,000,000 entries: " + (t1 - t0) + " milliseconds.");
var clusterize = new Clusterize({
    rows: data,
    scrollId: 'scrollArea',
    contentId: 'contentArea',
    rows_in_block: 30
});

function filterByBookGenre(genre) {
    var filteredData;
    const resultsElement = document.getElementById('results');
    if (genre && genre.value) {
        filteredData = data.filter(function (book) {
            return book.indexOf(genre.value) !== -1;
        });
        resultsElement.innerHTML = `Books with genre "${genre.value}": ${filteredData.length}`;
        resultsElement.style.display = 'block';
    } else {
        filteredData = data;
        resultsElement.style.display = 'none';
    }
    clusterize.update(filteredData);
}
