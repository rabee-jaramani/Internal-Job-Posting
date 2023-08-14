import React from 'react'
import { HashLoader } from 'react-spinners'

export default function Spinner() {
    return (
        <div className='spinner-cont'>
            <HashLoader color='#c4d600' speedMultiplier={2} />
        </div>
    )
}
