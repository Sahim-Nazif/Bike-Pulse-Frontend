import React, {useEffect, useState} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getBikes, deleteBike, getABike, updateBike } from './apiAdmin'



const ManageProducts = () => {

    const [bikes, setBikes]=useState([]);

    const {user, token}=isAuthenticated()
    const init=()=>{

        getBikes().then(data=>{
            if (data.error) {
                console.log(data.error)
            } else {
                setBikes(data)
            }
        })
    }

    const removeBike=bikeId=>{
        deleteBike(bikeId, user._id, token).then(data=>{
            if (data.error) {
                console.log(data.error)
            } else {
                init()
            }
        })
    }

    useEffect(()=>{

        init()
    },[])

    return (
        <Layout title='Manage Products' description='As Admin of this application you have privilages to perform CRUD on all products'
        className='container'>

           <div className='row'>
               <div className='col-8'>
                <ul className="list-group">
                  <p className='text-info display-4'>Total Bikes: {bikes.length}</p>
                 
                  {bikes.map((b, i)=>(
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                           <strong>{b.name} {"  "}</strong> 
                           <hr/>
                           <Link to={`/adim/product/update/${b._id}`}>
                               <span className='badge badge-warning badge-pill mr-4'>
                                   Update
                               </span>
                             
                           </Link>
                           <span onClick={()=>removeBike(b._id)} style={{cursor:'pointer'}} className='badge badge-danger badge-pill'>
                                   Delete
                               </span>
                        </li>
                  ))}

                </ul>
               </div>
                
           </div>
       </Layout>
    )
}

export default ManageProducts