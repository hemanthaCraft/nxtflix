import { useContext } from "react";

import Header from "../../components/Header/Header";
import { WatchLaterContext } from "../../context/WatchLaterContext";

function WatchLater() {
  const { watchLater, setWatchLater } = useContext(WatchLaterContext);

  const removeMovie = id => {
    const updatedMovies = watchLater.filter(movie => movie.id !== id);
    setWatchLater(updatedMovies);
  };

  return (
    <>
      <Header />

      <div className="home-container">
        <h1>Watch Later</h1>

        {watchLater.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          <div className="movies-grid">
            {watchLater.map(movie => (
              <div key={movie.id} className="movie-card">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="movie-poster"
                />

                <h3 className="movie-title">{movie.title}</h3>

                <p className="movie-rating">
                  ⭐ {movie.rating}
                </p>

                <button
                  onClick={() => removeMovie(movie.id)}
                  className="remove-btn"
                >
                  🗑 Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default WatchLater;