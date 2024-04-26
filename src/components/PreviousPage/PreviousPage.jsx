import css from "./PreviousPage.module.css";
export default function PreviousPage({ onPreviousPage }) {
  return (
    <button onClick={onPreviousPage} className={css.button}>
      Previous page
    </button>
  );
}
