import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import {listOrders } from './apiAdmin'



const Orders = () => {

    const [orders, setOrders]=useState([])

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

    useEffect(() => {
        loadOrders()
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
    return (
        <Layout title='List Of Orers' description={`Hello ${user.firstName} ! Here is the list placed orders?`}
        className='container'>

           <div className='row'>
               <div className='col-md-8 offset-md-2'>
                {showTotalOrderPlaced(orders)}
                
               </div>
           
           </div>
       </Layout>
    )
}

export default Orders
