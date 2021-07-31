import React, {useState} from 'react'
import {Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem,updateItem , removeItem } from './CartHelpers'


const Card = ({product,
     showViewDetailButton=true,
      showAddToCartButton=true,
       cartUpate=false,
        showRemoveProductButton=false}) => {

    const  [redirect, setRedirect]=useState(false)
    const [count, setCount]=useState(product.count)
    const showViewButton=()=>{
        return ( 
            showViewDetailButton && (
                <button className="btn btn-outline-info btn-sm mt-2 mb-2 mr-2">
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
        <button onClick={addToCart} className='btn btn-outline-info btn-sm mt-2 mb-2'>
            Add to Cart
        </button>
    )
}
 const showStock=(quantity)=>{
    return quantity >0 ? <span className='badge badge-warning badge-pill mr-2'>In Stock {product.quantity}</span>  : quantity.length <2 ? <span className='badge badge-warning badge-pill mr-2'>Only {product.quantity} left in stock.</span> : <span className='badge badge-danger badge-pill mr-2'>Out Of Stock</span>
 }

 const handleChange=productId=>event=>{
     setCount(event.target.value<1 ? 1: event.target.value)
     if (event.target.value>=1) {
         updateItem(productId, event.target.value)
     }
 }
 const showCartUpdateOptions=cartUpdate=>{
     return (cartUpdate && (
                <div className='input-group mb-3'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Adjust Quantity
                        </span>
                    </div>
                    <input type='number' className='form-control' value={count} onChange={handleChange(product._id)}/>

     </div>))
 }

 const showRemoveBtn=showRemoveProductButton=>{
    return showRemoveProductButton &&( 
        <button onClick={()=>removeItem(product._id)} className='btn btn-outline-danger btn-sm mt-2 mb-2'>
            Remove
        </button>
    )
}
    return (
        <div className='col-4 mb-3'>
            <div className='card'>
              <strong> <div className='card-header' >{product.name}  </div></strong> 
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
               
               
                {showRemoveBtn(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpate)}
                </div>
               
              
            </div>
            
        </div>
    )
}

export default Card
