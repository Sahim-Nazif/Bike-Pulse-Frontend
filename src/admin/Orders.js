import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import {listOrders, getStatusValue } from './apiAdmin'
import moment from 'moment'


const Orders = () => {

    const [orders, setOrders]=useState([])
    const [statusValues, setStatusValues]=useState([])



    const {user, token}= isAuthenticated()


    const loadOrders=()=>{

        listOrders(user._id, token).then(data=>{
            if (data.error) {
                console.log(data.error)
            }
            else {
                setOrders(data)
            }
        })
    }

    const loadStatusValues=()=>{

        getStatusValue(user._id, token).then(data=>{
            if (data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatusValues()
    },[])

    const showTotalOrderPlaced=()=>{

        if (orders.length>0) {
            return (
                <h2 className='text-info display-4'>Total Orers: {orders.length}</h2>
                
                )
        } else {
            return <h2 className='text-danger display-2'>No Orders</h2>
        }
       
    }

    const showInput=(key, value)=> {
        return ( 
        <div className='input-group mb-2 mr-sm-2'>
            <div className='input-group-prepend'>
                <div className='input-group-text'>
                    {key}
                </div>
            </div>
        <input type='text' value={value} className='form-control' readOnly />
        </div>
        )
    }

    const handleStatusChange=(e, orderId)=>{
        console.log('update status')
    }
    const showStatus=(o)=>{
        return ( 

            <div className='form-group'>
                <h4 className='mark mb-4'>Status: {o.status}</h4>
                <select className='form-control' onChange={(e)=>handleStatusChange(e, o._id)}>
                  <option>Update Status</option> 
                  {statusValues.map((status, index)=>(<option key={index} value={status}>{status}</option>))}
                </select>
            </div>
        )

    }
    return (
        <Layout title='List Of Orers' description={`Hello ${user.firstName} ! Here is the list placed orders?`}
        className='container'>

           <div className='row'>
               <div className='col-md-8 offset-md-2'>
                {showTotalOrderPlaced(orders)}

                {orders.map((orders, i)=>{

                    return ( 
                        <div className='mt-5' key={i} style={{borderBottom:'5px solid indigo'}}>

                            <h3 className='mb-5'>
                                <span className='bg-primary'> Order Id: {orders._id}</span>
                            </h3>
                            <ul className="list-group mb-2">
                                <li className='list-group-item'>{showStatus(orders)}</li>
                                <li className='list-group-item'>Transaction ID: {orders.transaction_id}</li>
                                <li className='list-group-item'>Amount: ${orders.amount}</li>
                                <li className='list-group-item'>Ordered By: {orders.user.firstName} {orders.user.lastName}</li>
                                <li className='list-group-item'>Ordered placed: {moment(orders.createdAt).fromNow()}</li>
                                <li className='list-group-item'>Shipping Address: {orders.address}</li>
                                
                            </ul>
                            <p className='mt-4 mb-4'> Total products in the orders: 
                             {orders.products.length}</p>
                             {orders.products.map((b,bIndex)=>(
                                 <div className='mb-4' key={bIndex} style={{padding:'20px', border:'1px solid'}}>

                                     {showInput('Product Name', b.name)}
                                     {showInput('Product price', b.price)}
                                     {showInput('Product total', b.count)}
                                     {showInput('Product Id', b._id)}
                                    
                                 </div>
                             ))}
                            </div>
                        
                    )
                })}
               </div>
           
           </div>
       </Layout>
    )
}

export default Orders
