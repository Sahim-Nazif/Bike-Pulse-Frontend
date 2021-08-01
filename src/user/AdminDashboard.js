import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'


const AdminDashboard = () => {

    const { user: { _id, firstName, lastName, email, about, role } } = isAuthenticated()

    const adminLinks = () => {
        return (

            <div className='card bg-dark mb-5'>
                <h4 className='card-header text-light'>Admin's Links</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link text-info' to='/create/category'>Create Category</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link text-info' to='/create/product'>Create Product</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link text-info' to='/admin/orders'>View Orders</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link text-info' to='/admin/products'>Manage Products</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminInfo = () => {
        return (
            <div className='card bg-dark mb-5'>
                <h3 className='card-header text-light'>{firstName}'s Information</h3>
                <ul className="list-group">
                    <li className='list-group-item'> {firstName} </li>
                    <li className='list-group-item'>{lastName}</li>
                  
                    <li className='list-group-item'>{email} </li>
                    <li className='list-group-item'>{role === 1 ? 'Admin' : 'Registered User'} </li>
                </ul>

            </div>
        )
    }


    return (
        <Layout title='Dashboard' description={`Hello ${firstName}  ${lastName}` } className='container' >
        
            <div className='row'>
                <div className='col-sm-6'>
                    {adminLinks()}
                 
                </div>
                <div className='col-sm-6'>
                    {adminInfo()}
             
                </div>
            </div>

        </Layout>
    )
}

export default AdminDashboard