import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getCart} from './CartHelpers'
import Card from './Card'
import {Link} from 'react-router-dom'
import Checkout from './Checkout'

const Cart = () => {

    const [items, setItems]=useState([])
    const [run, setRun]=useState(false)
    
    useEffect(() => {
        setItems(getCart())
    }, [run])

    const showItem=items=>{
        return ( 
        <div>
            <h5 className='text-info'>Total ({`${items.length}`}) items in cart</h5>
         
            {items.map((bike, i)=>(<Card key={i} product={bike} showAddToCartButton={false}
             cartUpate={true}   showRemoveProductButton={true}/>))}
             setRun={setRun}
             run={run}
        </div>)
    }
    const noItemsMessage=()=>{
        <h2>Your Cart is empty.<br/><Link to='/shop'>Continue Shopping</Link></h2>
    }
    return (
       <Layout
        title='Shopping Cart'
        description='Manage your cart items'
        className='container'>
            
            <div className='row justify-content-start'>
              
                <div className='col-md-9'>
                    {items.length >0 ? showItem(items): noItemsMessage()}
                </div>
                <div className=' col-md-3'>
                    <h5 className='text-info' >Your Cart Summary</h5>
                  
                    <Checkout products={items}/>
                </div>
            </div>
       </Layout>
    )
}

export default Cart
