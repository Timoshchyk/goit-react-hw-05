import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css.list}>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={location}
                className={css.movie}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className={css.img}
                />
                <div>
                  <h2 className={css.title}>{movie.title}</h2>
                  <p className={css.rate}>Rating: {movie.vote_average}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
