import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import MovieCard from "../../components/MovieCard/MovieCard";
import movies from "../../data/movies";


import "./Home.css";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    "All",
    "Action",
    "Drama",
    "Comedy",
    "Thriller",
    "Sci-Fi",
    "Romance",
    "Horror",
    "Fantasy",
  ];

  // Featured movie for Hero Banner
  const featuredMovie = movies[0];
  const trendingMovies = [...movies]
  .sort((a, b) => Number(b.rating) - Number(a.rating))
  .slice(0, 16);
  const latestMovies = movies
  .filter(movie => movie.year >= 2015)
  .slice(0, 16);

  const filteredMovies = movies
  .filter(movie => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  })
  .sort((a, b) => {
    if (sortBy === "ratingHigh") {
      return b.rating - a.rating;
    }

    if (sortBy === "ratingLow") {
      return a.rating - b.rating;
    }

    if (sortBy === "az") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "za") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  return (
    <>
      <Header />

      <div className="home-container">
        {/* Hero Banner */}
        <div
          className="hero"
          style={{
            backgroundImage: `url(${featuredMovie.backdrop})`,
          }}
        >
          <div className="hero-overlay">
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.overview}</p>

            <button
  className="watch-btn"
  onClick={() => navigate(`/movies/${featuredMovie.id}`)}
>
  ▶ Watch Now
</button>
          </div>
        </div>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="search-input"
          />
        </div>

        {/* Genre Filter */}
        <div className="genre-container">
          {genres.map(genre => (
            <button
              key={genre}
              className={
                selectedGenre === genre
                  ? "genre-btn active"
                  : "genre-btn"
              }
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
            
          ))}
        </div>

        <div className="sort-container">
  <label>Sort By: </label>

  <select
    value={sortBy}
    onChange={e => setSortBy(e.target.value)}
    className="sort-select"
  >
    <option value="">Default</option>
    <option value="ratingHigh">⭐ Rating: High → Low</option>
    <option value="ratingLow">⭐ Rating: Low → High</option>
    <option value="az">🔤 A → Z</option>
    <option value="za">🔤 Z → A</option>
  </select>
</div>

        {/* Movies */}
        {/* Trending */}
<div className="movies-section">
  <h2>🔥 Trending Now</h2>

  <div className="movies-row">
    {trendingMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
</div>

{/* Latest */}
<div className="movies-section">
  <h2>🆕 Latest Releases</h2>

  <div className="movies-row">
    {latestMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
</div>

{/* All Movies */}
<div className="movies-section">
  <h2>🎬 All Movies</h2>

  {filteredMovies.length > 0 ? (
  <div className="movies-grid">
    {filteredMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
) : (
  <div className="no-results">
    <h2>No Movies Found 🎬</h2>
    <p>Try searching with another title or genre.</p>
  </div>
)}
</div>
      </div>
    </>
  );
}

export default Home;