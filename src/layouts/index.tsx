import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Routers from '../routers'
import menu from './menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMinus } from '@fortawesome/free-solid-svg-icons'

const Layout = () => {
    const [scaleMenu, setScaleMenu] = useState(false)
    const navigate = useNavigate()

    const menuWidth = scaleMenu ? 'w-10' : 'w-1/5'
    const mainWidth = scaleMenu ? 'w-[calc(100%-40px)]' : 'w-4/5'
    const mainLeftPosition = scaleMenu ? 'left-10' : 'left-[20%]'
    return (
        <div className='w-full'>
            <header className='w-full h-14 flex items-center bg-black z-20 fixed top-0 left-0'>
                <p className='text-white cursor-pointer' onClick={() => navigate('/')}>Home</p>
            </header>

            <div className={`${menuWidth} h-screen pt-14 pb-2 bg-blue-50 z-10 fixed top-0 left-0 duration-300`}>
                <div className='my-4 flex justify-end cursor-pointer duration-300' onClick={() => setScaleMenu(!scaleMenu)}>
                    <div className='w-10 flex justify-center'>
                        {
                            scaleMenu ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faMinus} />
                        }
                    </div>
                </div>

                {
                    menu?.map((item, index) => (
                        <p
                            key={index}
                            className='h-10 px-2 flex items-center bg-red-100 cursor-pointer'
                            onClick={() => navigate('/spending-manager')}
                        >{item?.title}</p>
                    ))
                }
            </div>

            <div className={`${mainWidth} relative top-14 ${mainLeftPosition} bg-blue-100 duration-300`}>
                <div className='main min-h-[calc(100vh-56px)] p-2'>
                    <Routers />
                </div>
                <footer className='w-full h-14 bg-black'></footer>
            </div>
        </div>
    )
}

export default Layout