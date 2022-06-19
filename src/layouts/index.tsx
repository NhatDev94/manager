import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Routers from '../routers'
import menu from './menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

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

            <div className={`${menuWidth} h-screen pt-14 pb-2 bg-[#191919] text-white z-10 fixed top-0 left-0 duration-300`}>
                <div className='my-4 flex justify-end cursor-pointer duration-300' onClick={() => setScaleMenu(!scaleMenu)}>
                    <div className='w-10 flex justify-center'>
                        {
                            scaleMenu ? <FontAwesomeIcon icon={faAnglesRight} /> : <FontAwesomeIcon icon={faAnglesLeft} />
                        }
                    </div>
                </div>

                {
                    menu?.map((item, index) => {
                        const smallCss = 'group-hover:block bg-[#171717]'
                        return (
                            <div
                                key={index}
                                className='h-10 flex items-center cursor-pointer'
                                onClick={() => navigate('/spending-manager')}
                            >
                                <div className='w-10 group relative'>
                                    <FontAwesomeIcon className='w-10' icon={item.icon}></FontAwesomeIcon>
                                    <span className={`${scaleMenu ? smallCss : ''} hidden absolute top-1/2 left-[calc(100%+2px)] whitespace-nowrap p-1 text-xs font-medium rounded text-center`}>{item?.title}</span>
                                </div>
                                <p className={`${scaleMenu ? 'hidden' : ''} text-sm`}>{item?.title}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className={`${mainWidth} relative top-14 ${mainLeftPosition} bg-gray-200 duration-300`}>
                <div className='main min-h-[calc(100vh-56px)] p-2'>
                    <Routers />
                </div>
                <footer className='w-full h-14 bg-black'></footer>
            </div>
        </div>
    )
}

export default Layout