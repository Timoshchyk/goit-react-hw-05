import { useId, useState } from "react";
import css from "./SearchBar.module.css";

export default function SearchBar({
  onEmptyString,
  onFormSubmit,
  onFilterChange,
}) {
  const movieId = useId();
  const [text, setText] = useState("");

  const changeText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      onEmptyString();
      return;
    } else {
      onFormSubmit();
      onFilterChange(text);
      e.target.reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          id={movieId}
          onChange={changeText}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </div>
  );
}
