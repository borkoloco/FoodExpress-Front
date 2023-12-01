7

import style from './Loading.module.css'

/* img src = url de loading */
export const Loading = () => {
  return (
    <div className={style.containerLoading}>
      <img
        className={style.imgLoading}
        src="https://media.tenor.com/SWJCs0u0Tr0AAAAC/taco-tacos.gif"
        alt="Loading"
      />
    </div>
  );
};
