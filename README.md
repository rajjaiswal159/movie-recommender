<h1>🎬 MovieFlix: AI-Powered Movie Recommender</h1>

MovieFlix is a full-stack web application that provides intelligent movie recommendations using Machine Learning. It combines a sleek, responsive frontend with a FastAPI backend and a Content-Based Filtering engine trained on the TMDB 5000 dataset.

<h1>🚀 Features</h1>

● <b>Intelligent Search:</b> Find movies using exact titles or fuzzy matching (handles typos).<br>
● <b>Dynamic Recommendations:</b> Provides "Related Movies" based on overview, genres, keywords, cast, and crew.<br>
● <b>Trending Section:</b> Displays top-ranked movies calculated via a weighted rating formula.<br>
● <b>Detailed View:</b> Provides metadata for selected movies, including ratings, runtime, and plot summaries.<br>
● <b>Responsive UI:</b> Fully optimized for Desktop, Tablet, and Mobile devices.

<h1>🛠️ Tech Stack</h1>

<h2>Frontend</h2>
● <b>HTML5 & CSS3:</b> Custom-built responsive grid and hero sections.<br>
● <b>JavaScript (Vanilla):</b> Asynchronous API handling and DOM manipulation.<br>
</h2>Backend</h2>
● <b>FastAPI:</b> High-performance Python framework for building the REST API.<br>
● <b>Scikit-Learn:</b> Powering the TF-IDF Vectorization and Cosine Similarity calculations.<br>
● <b>Joblib:</b> For efficient serialization and loading of ML models.<br>
<h2>Machine Learning (The Engine)</h2>
● <b>Dataset:</b> TMDB 5000 Movies & Credits.<br>
● <b>Algorithm:</b> Content-Based Filtering.<br>
● <b>NLP:</b> Text preprocessing (removing punctuation, lowercasing, space collapsing) and TF-IDF to convert movie "tags" into numerical vectors.<br>
  
📐 How It WorksThe recommendation engine calculates the "distance" between movies in a high-dimensional vector space.Feature Engineering: A "tags" column is created by merging movie overviews, genres, keywords, and top cast/crew names.Vectorization: The engine uses $TF-IDF$ (Term Frequency-Inverse Document Frequency) to weigh the importance of specific words across the dataset.Similarity: When a user selects a movie, the system calculates the Cosine Similarity between that movie's vector and all others:$$\text{similarity} = \cos(\theta) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$Ranking: The top $N$ movies with the highest similarity scores are returned to the UI.📂 Project StructurePlaintext├── models/               # Saved ML artifacts (.pkl files)
├── main.py               # FastAPI Backend
├── index.html            # Frontend Entry Point
├── style.css             # UI Styling & Media Queries
├── script.js             # Frontend Logic & API Fetching
└── Movie_Recommendation.ipynb # Data Science & Model Training Notebook
⚙️ Setup & Installation1. Clone the RepositoryBashgit clone https://github.com/your-username/movie-recommender.git
cd movie-recommender
2. Set Up the BackendEnsure you have Python 3.8+ installed.Bash# Install dependencies
pip install fastapi uvicorn scikit-learn pandas joblib

# Run the API
uvicorn main:app --reload
The API will be available at http://127.0.0.1:8000.3. Launch the FrontendSimply open index.html in your preferred web browser. Ensure the backend is running so the data can load.📊 Model TrainingIf you wish to retrain the model:Open Movie_Recommendation.ipynb.Ensure you have the tmdb_5000_movies.csv and tmdb_5000_credits.csv files.Run all cells to export the updated vectorizer.pkl, vectors.pkl, and movies_data.pkl into the models/ folder.
