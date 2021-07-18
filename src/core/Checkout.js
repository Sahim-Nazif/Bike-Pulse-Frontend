import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'



const Checkout = ({products}) => {

    const getTotal=()=>{
        return products.reduce((currentValue, nextValue)=>{

            return currentValue + nextValue.count * nextValue. price*1.3
        },0)
    }
    return (
        <div>
            <h5>Total includes HST: ${getTotal()}</h5>
        </div>
    )
}

export default Checkout
