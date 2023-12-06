
import style from "./CardB.module.css";

export const CardB = () => {
  return (
    <div className={`${style.card} ${style.hoverEffect}`}>
      <div className={style.containerImage}>
        <img
          className={style.cardImage}
          src="https://thefoodtech.com/wp-content/uploads/2022/05/burguer-king-hamburguesas-sin-ingredientes-artificiales.jpg"
          alt="dsdsd"
        />
      </div>

      <div className={style.containerElements}>
        <h3 className={style.title}>Hamburguesa Americana</h3>
        <span className={style.categories}>Categories</span>
        <p className={style.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum delectus maiores deserunt deleniti quidem iusto qui obcaecati accusamus nulla, cum ab officiis, tenetur reprehenderit tempora autem. Porro animi saepe ullam?
        </p>

        <div className={style.endElements}>
          <span className={style.price}>$ 300</span>
          <button className={style.addButton}>Add Cart</button>
        </div>
      </div>
    </div>
  );
};


{/* <img className={style.cardImage} src="https://thefoodtech.com/wp-content/uploads/2022/05/burguer-king-hamburguesas-sin-ingredientes-artificiales.jpg" alt="dsdsd" /> */}