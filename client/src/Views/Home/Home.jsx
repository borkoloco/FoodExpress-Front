import React from 'react'
import menu from './menu'
import Cards from '../../components/Cards/Cards'

function Home() {
    const menuHardCode = menu()
    return (
        <div>
            <h3>
                <Cards props={menuHardCode} />
            </h3>

        </div>
    )
}

export default Home
