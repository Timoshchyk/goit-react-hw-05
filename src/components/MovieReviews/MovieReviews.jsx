import { useEffect, useState } from "react";
import { getMovieReviews } from "../../api";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./MovieReview.module.css";

export default function MovieReview() {
  const [error, setError] = useState(false);
  const [reviews, setReview] = useState([]);
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoader(true);
    const movieDetailsFromApi = async () => {
      try {
        const { results } = await getMovieReviews(movieId);
        setReview(results);
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
        {reviews.map((review) => {
          return (
            <li key={review.id} className={css.item}>
              <h2 className={css.author}>{review.author}</h2>
              <p className={css.text}>{review.content}</p>
            </li>
          );
        })}
      </ul>
      {reviews.length === 0 && <p>There is no rewies</p>}
      {error && <ErrorMessage />}
    </div>
  );
}
