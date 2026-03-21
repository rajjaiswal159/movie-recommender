const API_URL = "https://movie-api-c0f7.onrender.com";

// DOM references
const container = document.getElementById("moviesContainer");
const detailsDiv = document.getElementById("movieDetails");
const searchInput = document.getElementById("searchInput");
const sectionTitle = document.getElementById("sectionTitle");


// Display loading state inside movie container
function showLoader() {
  container.innerHTML = "<p>Loading...</p>";
}


// Reset UI to default homepage state
function goHome() {
  searchInput.value = "";
  detailsDiv.innerHTML = "";
  sectionTitle.innerText = "🔥 Trending Movies";

  loadTopMovies();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// Fetch and render top-ranked movies
async function loadTopMovies() {
  showLoader();
  detailsDiv.innerHTML = "";
  sectionTitle.innerText = "🔥 Popular Movies";

  try {
    const res = await fetch(`${API_URL}/top-movies?n=25`);
    const data = await res.json();

    displayMovies(data.movies);
  } catch (err) {
    container.innerHTML = "<p>Error loading movies</p>";
  }
}


// Render movie cards in grid container
function displayMovies(movies) {
  container.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}">
      <div class="movie-title">${movie.title}</div>
    `;

    // Fetch recommendations when a movie is clicked
    card.onclick = () => getMovieDetails(movie.title);

    container.appendChild(card);
  });
}


// Trigger search on Enter key press
searchInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});


// Fetch recommendations based on user query
async function searchMovie() {
  const query = searchInput.value.trim();

  if (!query) return;

  detailsDiv.innerHTML = "";
  sectionTitle.innerText = `🔍 Results for "${query}"`;

  showLoader();

  try {
    const res = await fetch(`${API_URL}/recommend?movie=${query}&n=25`);
    const data = await res.json();

    displayMovies(data.recommendations);
  } catch (err) {
    container.innerHTML = "<p>No results found</p>";
  }
}


// Fetch selected movie details and related recommendations
async function getMovieDetails(title) {
  showLoader();
  sectionTitle.innerText = "🎬 Related Movies";

  try {
    const res = await fetch(`${API_URL}/recommend?movie=${title}&n=10`);
    const data = await res.json();

    const movie = data.movie;

    // Render hero section if selected movie exists
    if (movie) {
      detailsDiv.innerHTML = `
        <div class="hero">
          <img src="${movie.poster}">
          <div class="hero-content">
            <h1>${movie.title}</h1>
            <p><b>⭐ Rating:</b> ${movie.vote_average}</p>
            <p><b>🎭 Genres:</b> ${movie.genres}</p>
            <p><b>⏱ Runtime:</b> ${movie.runtime} min</p>
            <p><b>📅 Release:</b> ${movie.release_date}</p>
            <p>${movie.overview}</p>
          </div>
        </div>
      `;
    }

    displayMovies(data.recommendations);

  } catch (err) {
    detailsDiv.innerHTML = "<p>Error loading details</p>";
  }
}


// Initial application load
loadTopMovies();
