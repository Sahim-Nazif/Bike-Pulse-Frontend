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

   
    
    return (
        <Layout title='Update Profile' description={`Hey ${greeting}  ${user.firstName}  ${user.lastName}` } className='container' >
        
            {JSON.stringify(values)}
       

    </Layout>
    )
}

export default Profile
