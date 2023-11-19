import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import Cards from '../../components/Cards/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMenu, getSpecialties, getTypesOfFood, filters, orderMenu } from '../../redux/action/action'

function Home() {
    const dispatch = useDispatch()
    const allMenu = useSelector((state) => state.allMenu)
    const allSpecialties = useSelector((state) => state.allSpecialties)
    const allTypesOfFood = useSelector((state) => state.allTypesOfFood)
    const [localFilter, setLocalFilter] = useState({
        specialties: '',
        types: '',
        availability: ''
    })

    useEffect(() => {
        if (allMenu.length === 0) {
            dispatch(getAllMenu())

        }
        if (allSpecialties.length === 0) {
            dispatch(getSpecialties())

        }
        if (allTypesOfFood.length === 0) {
            dispatch(getTypesOfFood())

        }
    }, [])



    const handleFilters = (element) => {
        const name = element.target.name;
        let value = element.target.value;
        console.log(value);
        setLocalFilter({
            ...localFilter, [name]: value
        })

        dispatch(filters({ ...localFilter, [name]: value }))
    }
    const handleOrder = (element) => {
        dispatch(orderMenu(element.target.value))
    }



    return (
        <div className={Style.bigDiv}>


            <div className={Style.barDiv}>
                <div className={`accordion ${Style.accordion}`} id="accordionExample">
                    <div className={`accordion-item ${Style.accordionItem}`}>
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Filtros
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>Especialidades</p>
                                <select className='form-select form-select-sm' aria-label="Small select example" name='specialties' defaultValue={""} onChange={(el) => handleFilters(el)}>

                                    <option value='all'>Todos</option>
                                    {
                                        allSpecialties && allSpecialties.map((special, index) => {
                                            return <option value={special} key={index}>{special}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="accordion-body">
                                <p>Tipos</p>
                                <select className='form-select form-select-sm' aria-label="Small select example" name='types' defaultValue={""} onChange={(el) => handleFilters(el)}>

                                    <option value='all'>Todos</option>
                                    {
                                        allTypesOfFood && allTypesOfFood.map((typeFood, index) => {
                                            return <option value={typeFood} key={index}>{typeFood}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="accordion-body">
                                <p>Disponibilidad</p>
                                <select className='form-select form-select-sm' aria-label="Small select example" name='availability' onChange={(el) => handleFilters(el)} defaultValue={''}>

                                    <option value='all'>Todos</option>
                                    <option value={1}>Disponible</option>
                                    <option value={0} >No disponible</option>
                                </select>
                            </div>
                            <div className="accordion-body">
                                <p>Ordenar por:</p>
                                <select className='form-select form-select-sm' aria-label="Small select example" onChange={(el) => handleOrder(el)}>

                                    <option value='nameUp'>AZ</option>
                                    <option value='nameDown'>ZA</option>
                                    <option value='priceUp'>Precio &uarr;</option>
                                    <option value='priceDown'>Precio &darr;</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={Style.cardsDiv}>
                {
                    allMenu && allMenu.length > 0 ? (

                        <Cards props={allMenu} />
                    )
                        :
                        (
                            <img className={Style.imgLoading} src="https://media.tenor.com/SWJCs0u0Tr0AAAAC/taco-tacos.gif" alt="Loading" />
                        )
                }

            </div>
        </div>
    )
}

export default Home


//     < select className = 'form-select form-select-sm' aria - label="Small select example" name = 'specialties' defaultValue = { ""} onChange = {(el) => handleFilters(el)}>
//                 <option value='' disabled>Especialidades</option>
//                 <option value='all'>Todos</option>
// {
//     allSpecialties && allSpecialties.map((special, index) => {
//         return <option value={special} key={index}>{special}</option>
//     })
// }
//             </select >

//             <select className='form-select form-select-sm' aria-label="Small select example" name='types' defaultValue={""} onChange={(el) => handleFilters(el)}>
//                 <option value='' disabled>Tipos</option>
//                 <option value='all'>Todos</option>
//                 {
//                     allTypesOfFood && allTypesOfFood.map((typeFood, index) => {
//                         return <option value={typeFood} key={index}>{typeFood}</option>
//                     })
//                 }
//             </select>

//             <select className='form-select form-select-sm' aria-label="Small select example" name='availability' onChange={(el) => handleFilters(el)} defaultValue={''}>
//                 <option value='' disabled>Disponibilidad</option>
//                 <option value='all'>Todos</option>
//                 <option value={1}>Disponible</option>
//                 <option value={0} >No disponible</option>
//             </select>

// {/* <label>Ordernar por:</label> */ }
// <select className='form-select form-select-sm' aria-label="Small select example" onChange={(el) => handleOrder(el)}>
//     <option selected disabled>Ordernar</option>
//     <option value='nameUp'>AZ</option>
//     <option value='nameDown'>ZA</option>
//     <option value='priceUp'>Precio &uarr;</option>
//     <option value='priceDown'>Precio &darr;</option>
// </select>