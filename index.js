let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let query = searchInput.value;
        if (query !== "") {
            fetchBooks(query);
        }
    }
});

function fetchBooks(title) {
    spinner.classList.remove("d-none");
    searchResults.innerHTML = "";

    fetch("https://apis.ccbp.in/book-store?title=" + title)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            spinner.classList.add("d-none");
            let books = data.search_results;

            books.forEach(function(book) {
                let container = document.createElement("div");
                container.classList.add("m-3", "text-center");

                let image = document.createElement("img");
                image.src = book.imageLink;

                let author = document.createElement("p");
                author.textContent = book.author;

                container.appendChild(image);
                container.appendChild(author);
                searchResults.appendChild(container);
            });
        });
}