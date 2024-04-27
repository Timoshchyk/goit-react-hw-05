import {
  useParams,
  NavLink,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../../api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { IoArrowBack } from "react-icons/io5";
import Loader from "../../components/Loader/Loader";

export default function MovieDetailsPage() {
  const [details, setDetails] = useState({});
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  useEffect(() => {
    const movieDetailsFromApi = async () => {
      try {
        setLoader(true);
        const data = await getMovieById(movieId);
        setDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    movieDetailsFromApi();
  }, [movieId]);

  useEffect(() => {
    stateRef.current = location.state;
  }, [location.state]);

  return (
    <div className={css.all}>
      <Link to={stateRef.current ?? "/movies"} className={css.button}>
        <IoArrowBack className={css.icon} />
        Go back
      </Link>
      {loader && <Loader />}
      <div className={css.wrap}>
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt=""
          className={css.img}
        />
        <div className={css.textWrap}>
          <h2>{details.original_title}</h2>
          <div className={css.titles}>
            <h3>Description:</h3>
            <p className={css.text}>&#34;{details.overview}.&#34;</p>
          </div>
          <div className={css.titles}>
            <h3>Tag line:</h3>
            <p className={css.text}>&#34;{details.tagline}&#34;</p>
          </div>
          <div className={css.titles}>
            <h3>Rating:</h3>
            <p className={css.text}>{details.vote_average}</p>
          </div>
        </div>
      </div>
      <div>
        <nav className={css.nav}>
          <NavLink to="cast" state={stateRef.current} className={buildLinkClass}>
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            state={stateRef.current}
            className={buildLinkClass}
          >
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
      {error && <ErrorMessage />}
    </div>
  );
}