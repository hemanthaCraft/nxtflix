import { useContext } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import movies from "../../data/movies";
import { WatchLaterContext } from "../../context/WatchLaterContext";

function MovieDetails() {
  const { id } = useParams();

  const { watchLater, setWatchLater } = useContext(WatchLaterContext);

  const movie = movies.find(item => item.id === Number(id));

  if (!movie) {
    return <h1>Movie Not Found</h1>;
  }

  const addToWatchLater = () => {
    const alreadyAdded = watchLater.some(item => item.id === movie.id);

    if (!alreadyAdded) {
      setWatchLater([...watchLater, movie]);
      alert("Movie added to Watch Later!");
    } else {
      alert("Movie already exists in Watch Later!");
    }
  };

  return (
    <>
      <Header />

      <div className="movie-details">
        <img
          src={movie.poster}
          alt={movie.title}
          width="300"
        />

        <h1>{movie.title}</h1>

        <p>⭐ {movie.rating}</p>

        <p>{movie.genre}</p>

        <p>{movie.duration}</p>

        <p>{movie.overview}</p>

        <button onClick={addToWatchLater}>
          ❤️ Add to Watch Later
        </button>
      </div>
    </>
  );
}

export default MovieDetails;