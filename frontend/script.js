const API_URL = "https://movie-api-c0f7.onrender.com";

// DOM references
const container = document.getElementById("moviesContainer");
const detailsDiv = document.getElementById("movieDetails");
const searchInput = document.getElementById("searchInput");
const sectionTitle = document.getElementById("sectionTitle");


// 🔄 Loader
function showLoader() {
  container.innerHTML = "<p>Loading...</p>";
}


// 🏠 Home reset
function goHome() {
  searchInput.value = "";
  detailsDiv.innerHTML = "";

  loadTopMovies();
  sectionTitle.innerText = "🔥 Trending Movies";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// 🎬 Load top movies
async function loadTopMovies() {
  showLoader();
  detailsDiv.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}/top-movies?n=25`);
    const data = await res.json();

    displayMovies(data.movies);
    sectionTitle.innerText = "🔥 Popular Movies";

  } catch (err) {
    container.innerHTML = "<p>Error loading movies</p>";
  }
}


// 🎥 Display grid
function displayMovies(movies) {
  container.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="movie-title">${movie.title}</div>
    `;

    // 👉 Click → show details + recommendations
    card.onclick = () => getMovieDetails(movie.title);

    container.appendChild(card);
  });
}


// 🔍 Enter key search
searchInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});


// 🔍 SEARCH → ONLY GRID (no hero)
async function searchMovie() {
  const query = searchInput.value.trim();
  if (!query) return;

  showLoader();
  detailsDiv.innerHTML = ""; // ❌ remove hero

  try {
    const res = await fetch(`${API_URL}/recommend?movie=${query}&n=25`);
    const data = await res.json();

    sectionTitle.innerText = `🔍 Results for "${query}"`;

    // ✅ ONLY grid
    displayMovies(data.recommendations);

  } catch (err) {
    container.innerHTML = "<p>No results found</p>";
  }
}


// 🎬 CLICK MOVIE → HERO + RELATED
async function getMovieDetails(title) {
  showLoader();

  try {
    const res = await fetch(`${API_URL}/recommend?movie=${title}&n=10`);
    const data = await res.json();

    const movie = data.movie;

    sectionTitle.innerText = "🎬 Related Movies";

    // ✅ HERO SECTION
    if (movie) {
      detailsDiv.innerHTML = `
        <div class="hero">
          <img src="${movie.poster}" alt="${movie.title}">
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

    // ✅ Related movies grid
    displayMovies(data.recommendations);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } catch (err) {
    detailsDiv.innerHTML = "<p>Error loading details</p>";
  }
}


// 🚀 Initial load
loadTopMovies();
