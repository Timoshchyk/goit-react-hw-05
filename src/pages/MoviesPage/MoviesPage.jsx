import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { moviesOnQuery } from "../../api";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import PreviousPage from "../../components/PreviousPage/PreviousPage";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [queryMovies, setQueryMovies] = useState([]);
  const [queryMoviesPage, setQueryMoviesPage] = useState(1);
  const [queryError, setQueryError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [totaQuerylPages, setTotalQueryPages] = useState(0);
  const [params, setParams] = useSearchParams();

  const filter = params.get("query") ?? "";

  const changeFilter = (newFilter) => {
    params.set("query", newFilter);
    setParams(params);
  };

  const onFormSubmit = () => {
    setQueryMoviesPage(1);
    setQueryMovies([]);
  };

  useEffect(() => {
    if (!filter) return;
    setLoader(true);
    const trendingMoviesFromApi = async () => {
      try {
        const { results, total_pages } = await moviesOnQuery(
          filter,
          queryMoviesPage
        );
        if (results.length === 0) {
          noResults();
          return;
        }
        setQueryMovies(results);
        setTotalQueryPages(total_pages);
      } catch (error) {
        setQueryError(true);
      } finally {
        setLoader(false);
      }
    };
    trendingMoviesFromApi();
  }, [filter, queryMoviesPage]);

  const onLoadMore = () => {
    setQueryMoviesPage(queryMoviesPage + 1);
  };

  const onPreviousPage = () => {
    setQueryMoviesPage(queryMoviesPage - 1);
  };

  const onEmptyString = () =>
    toast.error("The field is empty", {
      duration: 4000,
      position: "top-right",
    });

  const noResults = () =>
    toast.error("There is no results on your query", {
      duration: 4000,
      position: "top-right",
    });

  useEffect(() => {
    if (filter && !queryMovies.length) {
      onFormSubmit(filter);
    }
  }, [filter, queryMovies.length]);

  return (
    <div className={css.list}>
      <SearchBar
        onFormSubmit={onFormSubmit}
        onEmptyString={onEmptyString}
        onFilterChange={changeFilter}
      />
      {loader && <Loader />}
      {queryMovies.length > 0 && <MovieList movies={queryMovies} />}
      <div className={css.buttons}>
        {queryMoviesPage > 1 && (
          <PreviousPage onPreviousPage={onPreviousPage} />
        )}
        {queryMovies.length > 0 && queryMoviesPage < totaQuerylPages && (
          <LoadMoreButton onLoadMore={onLoadMore} />
        )}
      </div>
      {queryError && <ErrorMessage />}
      <Toaster />
    </div>
  );
}
