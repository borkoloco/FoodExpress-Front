import React from 'react'
import { Link } from 'react-router-dom'
import Style from './Card.module.css'

function Card({ nameMenu, description, imageUrl, price, available, typeMenu, specialtyMenu }) {

    return (

        <div className={Style.bigDiv}>
            <Link to={`/menu/detail/${nameMenu}`}>
                <img className={Style.image} src={imageUrl} alt={nameMenu} />
            </Link>
            <Link className={Style.deleteDecoration} to={`/menu/detail/${nameMenu}`}>
                <h3 className={Style.textName}>{nameMenu}</h3>
            </Link>
            <h3 className={Style.text}>Descripcion: {description}</h3>
            <h3 className={Style.text}>Precio: {price}</h3>
            <h3 className={Style.text}>Tipo: {typeMenu}</h3>
            <h3 className={Style.text}>Menu especial: {specialtyMenu}</h3>

        </div>




    )
}

export default Card

