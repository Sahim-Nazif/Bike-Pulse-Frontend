import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import {read, update, updateUser} from './apiUser'
import { Link } from 'react-router-dom'


const Profile = ({match}) => {

    const [values, setValues]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        error:false,
        success:false

    })

    const {firstName, lastName, email, password, error, success}=values
    const {user,token}=isAuthenticated()
    const init=(userId)=>{

        console.log(userId)
        read(userId, token).then(data=>{
            if (data.error) {
                setValues({...values, error:true})
            } else {
                setValues({...values, firstName:data.firstName, lastName:data.lastName, email:data.email})
            }
        })
    }
 
    useEffect(()=>{
        init(match.params.userId)
    },[])
    
       
        const today = new Date().getHours();
         let greeting
    
        if (today < 12) {
            greeting = "Good Morning"
        } else if (today < 18 ) {
            greeting = "Good Afternoon"
    
        } else if (today==20) {
            greeting='Good Evening'
        }
            else {
            greeting = "Good Night"
        }

   const handleChange=e=>{


   }
const clickSubmit=(e)=>{

}
    const profileUpdate=(firstName, lastName,email, password)=>{

        return ( 
            <>
            <form className='mx-auto'>

            
            <div className="form-group">
                <label className='text-muted'>First Name</label>
                <input type='text' onChange={handleChange('firstName') } className='form-control' value={firstName}/>
            </div>
             <div className="form-group">
                <label className='text-muted'>Last Name</label>
                <input type='text' onChange={handleChange('lastName') } className='form-control' value={lastName}/>
            </div>
            <div className="form-group">
                <label className='text-muted'>Email</label>
                <input type='text' onChange={handleChange('email') } className='form-control' value={email}/>
            </div>
            <div className="form-group">
                <label className='text-muted'>Password</label>
                <input type='password' onChange={handleChange('password') } className='form-control' value={password}/>
            </div>
            <button onClick={clickSubmit} className='btn btn-dark'>Update Now</button>
            </form>
            </>
        )
    }
    return (
        <Layout title='Update Profile' description={`Hey ${greeting}  ${user.firstName}  ${user.lastName}` } className='container col-md-5 mt-5' >
        
            {profileUpdate(firstName, lastName,email, password)}
       

    </Layout>
    )
}

export default Profile
