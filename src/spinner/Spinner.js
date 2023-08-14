import React from 'react'
import { HashLoader } from 'react-spinners'

export default function Spinner(props) {
    return (
        <div className='spinner-cont'>
            <HashLoader color='#c4d600' speedMultiplier={2} size={props.size ? props.size : 50} />
        </div>
    )
}
