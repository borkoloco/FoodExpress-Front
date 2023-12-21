import style from './ProductNotFound.module.css'

/* img src = url de loading */
export const ProductNotFound = () => {
    return (
        <div className={style.containerProductNotFound}>
            <img
                className={style.imgProductNotFound}
                src="https://media.tenor.com/SWJCs0u0Tr0AAAAC/taco-tacos.gif"
                alt="ProductNotFound"
            />
            <h3 className={style.h2}>Product Not Found</h3>
        </div>
    );
};