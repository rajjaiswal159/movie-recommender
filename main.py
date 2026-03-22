from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from difflib import get_close_matches

# Application instance
app = FastAPI(title="Movie Recommender API")

# Enable CORS for cross-origin frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load required ML artifacts
try:
    vectors = joblib.load("models/vectors.pkl")
    tfidf = joblib.load("models/vectorizer.pkl")
    movie_dict = joblib.load("models/movie_dict.pkl")
    movies_df = joblib.load("models/movies_data.pkl")
except Exception as e:
    raise RuntimeError(f"Model loading failed: {str(e)}")

# Precomputed metadata
titles_list = movies_df["title"].tolist()
SIM_MATRIX = cosine_similarity(vectors)


# Format movie response payload
def format_movies(indices):
    movies = []
    for i in indices:
        try:
            row = movies_df.iloc[i]
            movies.append({
                "id": int(row["movie_id"]),
                "title": row["title"],
                "vote_average": float(row["vote_average"]),
                "genres": row["genres"],
                "runtime": int(row["runtime"]),
                "release_date": row["release_date"],
                "overview": row["overview"],
                "poster": row["poster"]
            })
        except Exception:
            continue  # Skip corrupted rows safely
    return movies


# Retrieve similarity scores for a given index
def compute_similarity(idx):
    try:
        return SIM_MATRIX[idx]
    except IndexError:
        raise HTTPException(status_code=404, detail="Movie index not found")


# Resolve movie index using exact or fuzzy matching
def get_index_from_title(movie: str):
    if not movie or not movie.strip():
        raise HTTPException(status_code=400, detail="Movie title cannot be empty")

    movie = movie.lower()

    if movie in movie_dict:
        return movie_dict[movie]

    close_match = get_close_matches(movie, titles_list, n=1, cutoff=0.6)
    if close_match:
        return movie_dict.get(close_match[0])

    return None


# Core recommendation engine
def recommend_movie(movie: str, n: int):
    idx = get_index_from_title(movie)

    if idx is not None:
        sim_scores = SIM_MATRIX[idx]
        indices = np.argsort(sim_scores)[::-1][:n]

        if len(indices) == 0:
            raise HTTPException(status_code=404, detail="No recommendations found")

        return indices, idx

    try:
        new_vector = tfidf.transform([movie])
        sim_scores = cosine_similarity(new_vector, vectors).ravel()
        indices = np.argsort(sim_scores)[::-1][:n]

        if len(indices) == 0:
            raise HTTPException(status_code=404, detail="No similar movies found")

        return indices, None

    except Exception:
        raise HTTPException(status_code=500, detail="Recommendation engine failed")


# Health check endpoint
@app.get("/")
def home():
    return {"message": "Movie Recommendation API is running 🚀"}


# Fetch top-ranked movies for default UI
@app.get("/top-movies")
def get_top_movies(n: int = Query(10, ge=1, le=50)):
    try:
        top_movies = movies_df.sort_values(by="score", ascending=False).head(n)
        return {
            "movies": format_movies(top_movies.index.tolist())
        }
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch top movies")


# Movie recommendation endpoint
@app.get("/recommend")
def recommend(
    movie: str = Query(..., description="Movie title"),
    n: int = Query(10, ge=1, le=50)
):
    indices, idx = recommend_movie(movie, n)

    selected_movie = None
    if idx is not None:
        selected_movie = format_movies([idx])[0]

    return {
        "movie": selected_movie,
        "recommendations": format_movies(indices)
        }
