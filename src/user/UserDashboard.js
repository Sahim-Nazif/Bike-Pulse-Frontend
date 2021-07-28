import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'


const UserDashboard = () => {

    const { user: { _id, firstName, lastName, email, about, role } } = isAuthenticated()

    const userLinks = () => {
        return (

            <div className='card bg-dark mb-5'>
                <h4 className='card-header text-light'>{firstName}'s Links</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link text-info' to='/cart'>My Cart</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link text-info' to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const userInfo = () => {
        return (
            <div className='card bg-dark mb-5'>
                <h3 className='card-header text-light'>{firstName}'s Information</h3>
                <ul className="list-group">
                    <li className='list-group-item'> {firstName} </li>
                    <li className='list-group-item'>{lastName}</li>
                    <li className='list-group-item'>{about} </li>
                    <li className='list-group-item'>{email} </li>
                    <li className='list-group-item'>{role === 1 ? 'Admin' : 'Registered User'} </li>
                </ul>

            </div>
        )
    }

    const purchaseHistory = () => {
        return (
            <div className='card bg-dark mb-5'>
                <h3 className='card-header text-light'>Purchase History</h3>
                <ul className="list-group">
                    <li className='list-group-item'>History </li>

                </ul>
            </div>
        )
    }
    return (
        <Layout title='Dashboard' description={`Hello ${firstName}  ${lastName}` } className='container' >
        
            <div className='row'>
                <div className='col-sm-6'>
                    {userLinks()}
                 
                </div>
                <div className='col-sm-6'>
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>

        </Layout>
    )
}

export default UserDashboard
