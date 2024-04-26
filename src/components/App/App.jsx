import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader.jsx";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const Navigation = lazy(() => import("../Navigation/Navigation.jsx"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews.jsx"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="reviews" element={<MovieReviews />} />
          <Route path="cast" element={<MovieCast />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
