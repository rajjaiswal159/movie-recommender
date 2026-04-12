# 🎬 MovieFlix: AI-Powered Movie Recommender

MovieFlix is a full-stack web application that provides intelligent movie recommendations using Machine Learning. It combines a sleek, responsive frontend with a FastAPI backend and a Content-Based Filtering engine trained on the TMDB 5000 dataset.

---

## 🚀 Features

- <b>Intelligent Search:</b> Find movies using exact titles or fuzzy matching (handles typos).
- <b>Dynamic Recommendations:</b> Provides "Related Movies" based on overview, genres, keywords, cast, and crew.<br>
- <b>Trending Section:</b> Displays top-ranked movies calculated via a weighted rating formula.<br>
- <b>Detailed View:</b> Provides metadata for selected movies, including ratings, runtime, and plot summaries.<br>
- <b>Responsive UI:</b> Fully optimized for Desktop, Tablet, and Mobile devices.

<h1>🛠️ Tech Stack</h1>

<h2>Frontend</h2>
● <b>HTML5 & CSS3:</b> Custom-built responsive grid and hero sections.<br>
● <b>JavaScript (Vanilla):</b> Asynchronous API handling and DOM manipulation.<br>
<h2>Backend</h2>
● <b>FastAPI:</b> High-performance Python framework for building the REST API.<br>
● <b>Scikit-Learn:</b> Powering the TF-IDF Vectorization and Cosine Similarity calculations.<br>
● <b>Joblib:</b> For efficient serialization and loading of ML models.<br>
<h2>Machine Learning (The Engine)</h2>
● <b>Dataset:</b> TMDB 5000 Movies & Credits.<br>
● <b>Algorithm:</b> Content-Based Filtering.<br>
● <b>NLP:</b> Text preprocessing (removing punctuation, lowercasing, space collapsing) and TF-IDF to convert movie "tags" into numerical vectors.<br>
  
<h1>📐 How It Works</h1>

The recommendation engine calculates the "distance" between movies in a high-dimensional vector space.<br>
<b>1. Feature Engineering:</b> A "tags" column is created by merging movie overviews, genres, keywords, and top cast/crew names.<br>
<b>2. Vectorization:</b> The engine uses $TF-IDF$ (Term Frequency-Inverse Document Frequency) to weigh the importance of specific words across the dataset.<br>
<b>3. Similarity:</b> When a user selects a movie, the system calculates the Cosine Similarity between that movie's vector and all others.<br>
<b>4. Ranking:</b> The top N movies with the highest similarity scores are returned to the UI.<br>

<h1>📂 Project Structure</h1>

```
├── models/               
      ├── movie_dict.pkl  # store movies index
      ├── movies_data.pkl # store movies data
      ├── vectorizer.pkl  # store Tf-Idf vectorizer model
      ├── vectors.pkl     # store encoded vectors
├── main.py               # FastAPI Backend
├── requirements.txt      # Requirements
├── Procfile              # For API deployment 
├── frontend/
      ├── index.html      # HTML file
      ├── style.css       # CSS file 
      ├── script.js       # JS file
└── Movie_Recommendation.ipynb # Data Cleaning & Model Training Notebook
```

<h1>⚙️ Setup & Installation</h1>

<h2>1. Clone the Repository</h2>

```
git clone https://github.com/rajjaiswal159/movie-recommender.git
cd movie-recommender
```
<h2>2. Set Up the Backend</h2>
Ensure you have Python 3.8+ installed.

```
# Install dependencies
pip install fastapi uvicorn scikit-learn pandas joblib

# Run the API
uvicorn main:app --reload
```
The API will be available at [http://127.0.0.1:8000](https://movie-api-c0f7.onrender.com).
<h2>3. Launch the Frontend</h2>
Simply open index.html in your preferred web browser. Ensure the backend is running so the data can load.
