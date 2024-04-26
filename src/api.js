import axios from "axios";

axios.defaults.headers.common["accept"] = "application/json";

export const trendingMovies = async (page) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=8169cdf64b5d97a42fe8af03bcc06f40`
  );
  return data;
};

export const moviesOnQuery = async (query, page) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}&api_key=8169cdf64b5d97a42fe8af03bcc06f40`
  );
  return data;
};

export const getMovieById = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=8169cdf64b5d97a42fe8af03bcc06f40`
  );
  return data;
};

export const getMovieCast = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=8169cdf64b5d97a42fe8af03bcc06f40`
  );
  return data;
};

export const getMovieReviews = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1&api_key=8169cdf64b5d97a42fe8af03bcc06f40`
  );
  return data;
};
