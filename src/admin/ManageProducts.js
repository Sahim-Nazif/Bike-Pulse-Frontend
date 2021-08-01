
import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'



const ManageProducts = () => {
    return (
        <Layout title='Manage Products' description='As Admin of this application you have privilages to perform CRUD on all products'
        className='container'>

           <div className='row'>
               <div className='col-md-8 offset-md-2'>
              
               </div>
           
           </div>
       </Layout>
    )
}

export default ManageProducts