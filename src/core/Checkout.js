import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import { isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'

const Checkout = ({products}) => {

    const getTotal=()=>{
        return products.reduce((currentValue, nextValue)=>{

            return currentValue + nextValue.count * nextValue. price*1.3
        },0)
    }

    const showCheckout=()=>{
        return isAuthenticated() ? (
            <button className='btn btn-success'>Checkout</button>
        ) :(
            <Link to='/signin'>
                <button 
                 className='btn btn-info'>Sign in to Checkout
                 </button></Link>
        )}
    
    return (
        <div>
            <h5>Total includes HST: ${getTotal()}</h5>
            {showCheckout()}
        </div>
    )
}

export default Checkout
