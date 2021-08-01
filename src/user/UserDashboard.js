import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import {getPurchaseHistory} from './apiUser'
import moment from 'moment'
const UserDashboard = () => {

    const [history, setHistory]=useState([])



    const { user: { _id, firstName, lastName, email, about, role } } = isAuthenticated()
    const token=isAuthenticated().token

    const init=(userId, token)=>{
        getPurchaseHistory(userId, token).then(data=>{
            if(data.error) {
                console.log(data.error)
            } else {
                setHistory(data)
            }
        })
    }


    useEffect(() => {

        init(_id, token)
    },[])
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

    const purchaseHistory = (history) => {
        return (
            <div className='card bg-dark mb-5'>
                <h3 className='card-header text-light'>Purchase History</h3>
                <ul className="list-group">
                    <li className='list-group-item'>
                        {history.map((h, i)=>{
                            return (
                                <div>
                                    <hr/>
                            {h.products.map((p,i)=>{
                                return (
                                <div key={i}>
                                    <p>Bike: {p.name}</p>
                                    <p>Price: ${p.price}</p>
                                    <p>Date Purchased: {moment(p.createdAt).fromNow()}</p>
                                </div>
                                )
                            })}
                            </div>
                            )
                        }
                        
                        )}
                     </li>

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
                    {purchaseHistory(history)}

                </div>
            </div>

        </Layout>
    )
}

export default UserDashboard
