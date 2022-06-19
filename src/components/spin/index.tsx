import React, { useEffect, useState } from 'react'

const Spin = () => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        let count = width
        const range = 2
        const id = setInterval(() => {
            if (count >= 96) {
                count = range
                setWidth(count)
                return
            }
            count = count + range
            setWidth(count)
        }, 20)
        return () => {
            clearInterval(id)
        }
    }, [])

    return (
        <div className='fixed flex items-center justify-center w-screen h-screen top-0 left-0 bg-gray-50/50 z-50'>
            <div className='w-24 h-8 relative bg-blue-500 px-3 py-1'>
                <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center text-white font-bold text-sm z-20'>
                    <p>Loading...</p>
                </div>
                <p className={`h-full absolute top-0 left-0 bg-red-500 z-1`} style={{width: `${width}px`}}></p>
            </div>
        </div>
    )
}

export default Spin