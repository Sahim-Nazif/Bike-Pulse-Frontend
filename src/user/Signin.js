import React, {useState} from 'react'
import Layout from '../core/Layout'
import {signin} from '../auth/index'

const Signin = () => {

    const [values, setValues]=useState({
       
        email:'',
        password:'',
        error:'',
        success:false

    })
    const { email,password, error, success}=values;
    //the dynamic value can any input value from the form
    const handleChange=dynamicValue=>event=>{

        setValues({...values, error:false, [dynamicValue]:event.target.value})
    }


    const clickSubmit=event=>{
      
        event.preventDefault()
        setValues({...values, error:false})
        signin({ email, password})
                .then(data=>{
                     if (data.error){
                setValues({...values, error: data.error, success:false})
                     }
            else{
                setValues({
                    ...values,
                    email:'',
                    password:'',
                    error:'',
                    success:true
                        
                })
            }
        
        })

    }
    const signInForm=()=>{

        return (
            <form >

                <div className='form-group'>
                    <label className='text-muted'>Email *</label>
                    <input onChange={handleChange('email')} type='email' className='form-control' value={email}/>
                </div>
              
                <div className='form-group'>
                    <label className='text-muted'>Password *</label>
                    <input onChange={handleChange('password')}type='password' className='form-control' value={password}/>
                </div>
                <button onClick={clickSubmit} className='btn btn-dark'>
                    Sign up
                </button>
            </form>
            
            )
    }
    const showError=()=>(
    
        <div className='alert alert-danger' style={{display:error ? '':'none'}}>
            {error}
        
        </div>
    )
    const showSuccess=()=>{
        return(
            <div className='alert alert-info' style={{display: success? '': 'none'}}>
          

        </div>
     )
  
    }
    return (
        
        <Layout title='Login' description='Did you know that registered users have more more perks? login to discover.'
        className='container col-md-8 offset-md-2'>
        
        {showSuccess()}
        {showError()}
        {signInForm()}

        </Layout>
      
    )
}

export default Signin



