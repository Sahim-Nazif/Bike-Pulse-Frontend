import React, {useState} from 'react'
import Layout from '../core/Layout'
import {signup} from '../auth/index'

const Signup = () => {

    const [values, setValues]=useState({

        firstName:'',
        lastName:'',
        email:'',
        about:'',
        password:'',
        error:'',
        success:false

    })
    const {firstName, lastName, email, about, password, error, success}=values;
    //the dynamic value can any input value from the form
    const handleChange=dynamicValue=>event=>{

        setValues({...values, error:false, [dynamicValue]:event.target.value})
    }


    const clickSubmit=event=>{
      
        event.preventDefault()
        setValues({...values, error:false})
        signup({firstName, lastName, email, about, password})
                .then(data=>{
                     if (data.error){
                setValues({...values, error: data.error, success:false})
                     }
            else{
                setValues({
                    ...values,
                        firstName:'',
                        lastName:'',
                        email:'',
                        about:'',
                        password:'',
                        error:'',
                        success:true
                })
            }
        
        })

    }
    const signUpForm=()=>{

        return (
            <form >

                <div className='form-group'>
                    <label className='text-muted'>First Name *</label>
                    <input onChange={handleChange('firstName')} type='text' className='form-control' value={firstName}/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Last Name *</label>
                    <input onChange={handleChange('lastName')} type='text' className='form-control' value={lastName}/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Email *</label>
                    <input onChange={handleChange('email')} type='email' className='form-control' value={email}/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>About (optional)</label>
                    <textarea onChange={handleChange('about')} type='textarea' className='form-control' value={about}/>
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
            {firstName, 'Your account created successfully'}

        </div>
     )
  
    }
    return (
        
        <Layout title='Register' description='Registered users can now qualify for discounts.'
        className='container col-md-8 offset-md-2'>
        
        {showSuccess()}
        {showError()}
        {signUpForm()}

        </Layout>
      
    )
}

export default Signup
