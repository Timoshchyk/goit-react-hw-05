import { useEffect, useState } from "react";
import { getMovieCast } from "../../api";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [error, setError] = useState(false);
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoader(true);
    const movieDetailsFromApi = async () => {
      try {
        const { cast } = await getMovieCast(movieId);
        setCast(cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    movieDetailsFromApi();
  }, [movieId]);

  return (
    <div>
      {loader && <Loader />}
      <ul className={css.list}>
        {cast.map((character) => {
          return (
            <li key={character.id} className={css.item}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${character.profile_path}`}
              />
              <div className={css.text}>
                <h2>{character.name}</h2>
                <p>Character: {character.character}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {error && <ErrorMessage />}
    </div>
  );
}
