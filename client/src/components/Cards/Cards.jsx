import React from 'react'
import Card from '../Card/Card'
import Style from './Cards.module.css'

function Cards({ props }) {

    return (
        <div className={Style.bigDiv}>
            {props.map((plato) => {
                const { nameMenu, description, imageUrl, price, available, typeMenu, specialtyMenu } = plato
                return (
                    <div className={Style.item}>
                        <Card nameMenu={nameMenu} description={description} imageUrl={imageUrl} price={price} available={available} typeMenu={typeMenu} specialtyMenu={specialtyMenu} />
                    </div>
                )
            })}
        </div>
    )
}

export default Cards