import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getCart } from './CartHelpers'
import Card from './Card'



const Cart = () => {

    const [items, setItems]=useState([])

    useEffect(() => {

            setItems(getCart())
    }, [])
    return (
       <div>
           
       </div>
    )
}

export default Cart
