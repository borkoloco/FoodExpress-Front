import React, { useEffect } from 'react'
import Cards from '../../components/Cards/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMenu } from '../../redux/action/action'

function Home() {
    const dispatch = useDispatch()
    const allMenu = useSelector((state) => state.allMenu)
    useEffect(() => {
        if (allMenu.length === 0) {
            dispatch(getAllMenu())

        }
    }, [])





    return (
        <div>
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
