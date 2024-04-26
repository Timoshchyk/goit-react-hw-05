import { useEffect, useState } from "react";
import { trendingMovies } from "../../api";
import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PreviousPage from "../../components/PreviousPage/PreviousPage";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const trendingMoviesFromApi = async () => {
      try {
        const { results, total_pages } = await trendingMovies(page);
        setMovies(results);
        setTotalPages(total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    trendingMoviesFromApi();
  }, [page]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onPreviousPage = () => {
    setPage(page - 1);
  };
  return (
    <div className={css.list}>
      <h1 className={css.title}>Top movies</h1>
      {loader && <Loader />}
      <MovieList movies={movies} />
      <div className={css.buttons}>
        {page > 1 && <PreviousPage onPreviousPage={onPreviousPage} />}
        {movies.length > 0 && page < totalPages && (
          <LoadMoreButton onLoadMore={onLoadMore} />
        )}
      </div>
      {error && <ErrorMessage />}
    </div>
  );
}
