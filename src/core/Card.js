import React, {useState} from 'react'
import {Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem } from './CartHelpers'


const Card = ({product, showViewDetailButton=true, showAddToCartButton=true}) => {

    const  [redirect, setRedirect]=useState(false)

    const showViewButton=()=>{
        return ( 
            showViewDetailButton && (
                <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                View Details
            </button>
            )
        )
    }

const addToCart=()=> {

    addItem(product, ()=>{
        setRedirect(true)
    })
}

const shouldRedirect=redirect=>{
    if (redirect) {
        return <Redirect to='/cart'/>
    }
}
const showAddToCartBtn=showAddToCartButton=>{
    return showAddToCartButton &&( 
        <button onClick={addToCart} className='btn btn-outline-info mt-2 mb-2'>
            Add to Cart
        </button>
    )
}
 const showStock=(quantity)=>{
    return quantity >0 ? <span className='badge badge-warning badge-pill mr-2'>In Stock {product.quantity}</span>  : quantity.length <2 ? <span className='badge badge-warning badge-pill mr-2'>Only {product.quantity} left in stock.</span> : <span className='badge badge-danger badge-pill mr-2'>Out Of Stock</span>
 }
    return (
        <div className='col-4 mb-3'>
            <div className='card'>
              <strong> <div className='card-header'>{product.name}  </div></strong> 
                <div className='card-body'>
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url='products'></ShowImage>
               <p>{product.description.substring(0,30)}</p> 
               <p className='black-9'>${product.price}</p>
               <p className='black-8'>Category: {product.category && product.category.name}</p>
               <p className='black-8'>Added on: {moment(product.createdAt).fromNow()}</p>
               {showStock(product.quantity)}
               <br/>
               <Link to={`/product/${product._id}`}>
                  {showViewButton()}
               </Link>
                {showAddToCartBtn(showAddToCartButton)}
                </div>
               
              
            </div>
            
        </div>
    )
}

export default Card
