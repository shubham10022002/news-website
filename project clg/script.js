const apiKey = '7442de9a5d824825a5fcccc1f890da6f';
let searchQuery = '';

// Function to fetch news articles based on the search query
function fetchNews() {
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&from=2024-03-21&sortBy=popularity&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = ''; // Clear previous search results

            articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('article');

                const title = document.createElement('h2');
                title.textContent = article.title;

                const description = document.createElement('p');
                description.textContent = article.description;

                const image = document.createElement('img');
                image.src = article.urlToImage;
                image.alt = article.title;

                articleDiv.appendChild(title);
                articleDiv.appendChild(description);
                articleDiv.appendChild(image);

                newsContainer.appendChild(articleDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Event listener for search input change
document.getElementById('search-input').addEventListener('input', function() {
    searchQuery = this.value.trim();
    if (searchQuery !== '') {
        fetchNews();
    } else {
        // If search query is empty, display all news
        fetchNews(); // You can decide to do something different here, like displaying a message or showing default news.
    }
});

// Initial fetch without search query
fetchNews();
