import React from 'react'
import {Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'

const Card = ({product, showViewDetailButton=true}) => {

    const showViewButton=()=>{
        return ( 
            showViewDetailButton && (
                <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                View Details
            </button>
            )
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
               <button className="btn btn-outline-info mt-2 mb-2">
                       Add to Cart
                   </button>
                </div>
               
              
            </div>
            
        </div>
    )
}

export default Card
