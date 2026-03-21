<h1>🎬 MovieFlix: AI-Powered Movie Recommender</h1>

MovieFlix is a full-stack web application that provides intelligent movie recommendations using Machine Learning. It combines a sleek, responsive frontend with a FastAPI backend and a Content-Based Filtering engine trained on the TMDB 5000 dataset.

<h1>🚀 Features</h1>
● <b>Intelligent Search:</b> Find movies using exact titles or fuzzy matching (handles typos).Dynamic Recommendations: Provides "Related Movies" based on overview, genres, keywords, cast, and crew.Trending Section: Displays top-ranked movies calculated via a weighted rating formula.Detailed View: Provides metadata for selected movies, including ratings, runtime, and plot summaries.Responsive UI: Fully optimized for Desktop, Tablet, and Mobile devices.🛠️ Tech StackFrontendHTML5 & CSS3: Custom-built responsive grid and hero sections.JavaScript (Vanilla): Asynchronous API handling and DOM manipulation.BackendFastAPI: High-performance Python framework for building the REST API.Scikit-Learn: Powering the TF-IDF Vectorization and Cosine Similarity calculations.Joblib: For efficient serialization and loading of ML models.Machine Learning (The Engine)Dataset: TMDB 5000 Movies & Credits.Algorithm: Content-Based Filtering.NLP: Text preprocessing (removing punctuation, lowercasing, space collapsing) and TF-IDF to convert movie "tags" into numerical vectors.📐 How It WorksThe recommendation engine calculates the "distance" between movies in a high-dimensional vector space.Feature Engineering: A "tags" column is created by merging movie overviews, genres, keywords, and top cast/crew names.Vectorization: The engine uses $TF-IDF$ (Term Frequency-Inverse Document Frequency) to weigh the importance of specific words across the dataset.Similarity: When a user selects a movie, the system calculates the Cosine Similarity between that movie's vector and all others:$$\text{similarity} = \cos(\theta) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$Ranking: The top $N$ movies with the highest similarity scores are returned to the UI.📂 Project StructurePlaintext├── models/               # Saved ML artifacts (.pkl files)
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
