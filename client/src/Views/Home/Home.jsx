import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMenu, getSpecialties, getTypesOfFood, filters } from '../../redux/action/action'

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



    return (
        <div>

            <select name='specialties' defaultValue={""} onChange={(el) => handleFilters(el)}>
                <option value='' disabled>Especialidades</option>
                <option value='all'>Todos</option>
                {
                    allSpecialties && allSpecialties.map((special, index) => {
                        return <option value={special} key={index}>{special}</option>
                    })
                }
            </select>

            <select name='types' defaultValue={""} onChange={(el) => handleFilters(el)}>
                <option value='' disabled>Tipos</option>
                <option value='all'>Todos</option>
                {
                    allTypesOfFood && allTypesOfFood.map((typeFood, index) => {
                        return <option value={typeFood} key={index}>{typeFood}</option>
                    })
                }
            </select>

            <select name='availability' onChange={(el) => handleFilters(el)} defaultValue={''}>
                <option value='' disabled>Disponibilidad</option>
                <option value='all'>Todos</option>
                <option value={1}>Disponible</option>
                <option value={0} >No disponible</option>
            </select>


            <h3>
                {
                    allMenu && allMenu.length > 0 ? (

                        <Cards props={allMenu} />
                    )
                        :
                        (
                            <img src="https://media.tenor.com/SWJCs0u0Tr0AAAAC/taco-tacos.gif" alt="Loading" />
                        )
                }
            </h3>

        </div>
    )
}

export default Home
