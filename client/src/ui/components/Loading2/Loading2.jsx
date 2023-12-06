import style from "./Loading2.module.css"

export const Loading2 = () => {
  return (
    <div className={style.containerLoading}>
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
