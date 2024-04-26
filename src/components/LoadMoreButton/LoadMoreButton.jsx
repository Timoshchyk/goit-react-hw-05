import css from "./LoadMoreButton.module.css";

export default function LoadMoreButton({ onLoadMore }) {
  return (
    <button onClick={onLoadMore} className={css.button}>
      Next page
    </button>
  );
}
