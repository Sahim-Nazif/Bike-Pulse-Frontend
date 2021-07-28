import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'


const Profile = () => {

 
    
       
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



    
    const {user:{firstName, lastName}}=isAuthenticated()
    return (
        <Layout title='Update Profile' description={`Hey ${greeting}  ${firstName}  ${lastName}` } className='container' >
        
        
       

    </Layout>
    )
}

export default Profile
