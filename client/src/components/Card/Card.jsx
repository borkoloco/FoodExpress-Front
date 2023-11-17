import React from 'react'
import Style from './Card.module.css'

function Card({ nameMenu, description, imageUrl, price, available, typeMenu, specialtyMenu }) {

    return (
        <div className={Style.bigDiv}>
            <img className={Style.image} src={imageUrl} alt={nameMenu} />
            <h3 className={Style.textName}>{nameMenu}</h3>
            <h3 className={Style.text}>Descripcion: {description}</h3>
            <h3 className={Style.text}>Precio: {price}</h3>
            <h3 className={Style.text}>Tipo: {typeMenu}</h3>
            <h3 className={Style.text}>Menu especial: {specialtyMenu}</h3>
            {
                available ? (<h3 className={Style.text}>Esta disponible</h3>) : (<h3 className={Style.text}>No esta disponible</h3>)
            }

        </div>
    )
}

export default Card