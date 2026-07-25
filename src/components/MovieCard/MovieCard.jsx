import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-link">
      <div className="movie-card">
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
        />

        <h3 className="movie-title">{movie.title}</h3>

        <p className="movie-rating">
          ⭐ {movie.rating}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;