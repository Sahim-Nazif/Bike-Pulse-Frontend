import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getCart } from './CartHelpers'
import Card from './Card'
import {Link} from 'react-router-dom'


const Cart = () => {

    const [items, setItems]=useState([])

    useEffect(() => {

            setItems(getCart())
    }, [])

    const showItem=items=>{
        return ( 
        <div>
            <h5 className='text-info'>Total ({`${items.length}`}) items in cart</h5>
            <hr/>
            {items.map((bike, i)=>(<Card key={i} product={bike} showAddToCartButton={false}
             cartUpate={true}/>))}
        </div>)
    }
    const noItemsMessage=()=>{
        <h2>Your Cart is empty.<br/><Link to='/shop'>Continue Shopping</Link></h2>
    }
    return (
       <Layout
        title='Shopping Cart'
        description='Manage your cart items'
        className='container-fluid'>
            
            <div className='row'>
                <div className='col-8'>
                    {items.length >0 ? showItem(items): noItemsMessage()}
                </div>
                <div className='col-4'>
                   <p>Show checkout options/shipping address/total update</p>
                </div>
            </div>
       </Layout>
    )
}

export default Cart
