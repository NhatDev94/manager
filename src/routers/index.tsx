import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Spending from './spending'

const Routers = () => {

    return (
        <Routes>
            <Route path='/spending-manager' element={<Spending />}></Route>
        </Routes>
    )
}

export default Routers