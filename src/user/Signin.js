import React, {useState} from 'react'
import Layout from '../core/Layout'
import {signin, authenticate} from '../auth/index'
import {Redirect} from 'react-router-dom'


const Signin = () => {

    const [values, setValues]=useState({
       
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectUserTo:false

    })
    const { email,password, error, loading, redirectUserTo}=values;
    //the dynamic value can any input value from the form
    const handleChange=dynamicValue=>event=>{

        setValues({...values, error:false, [dynamicValue]:event.target.value})
    }


    const clickSubmit=event=>{
      
        event.preventDefault()
        setValues({...values, error:false, loading:true})
        signin({ email, password})
                .then(data=>{
                     if (data.error){
                setValues({...values, error: data.error, loading:false})
                     }
            else{
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                        redirectUserTo:true
    
                    })
                })
             
            }
        
        })

    }
    const signInForm=()=>{

        return (
            <form >

                <div className='form-group'>
                    <label className='text-muted'>Email </label>
                    <input onChange={handleChange('email')} type='email' className='form-control' value={email}/>
                </div>
              
                <div className='form-group'>
                    <label className='text-muted'>Password </label>
                    <input onChange={handleChange('password')}type='password' className='form-control' value={password}/>
                </div>
                <button onClick={clickSubmit} className='btn btn-dark'>
                    Sign in
                </button>
            </form>
            
            )
    }
    const showError=()=>(
    
        <div className='alert alert-danger' style={{display:error ? '':'none'}}>
            {error}
        
        </div>
    )
    const showLoading=()=>{
        return(
             loading && (
                 <div className='alert alert-info'>
                     <h2>Loading...</h2>
                 </div>
             )
     )
  
    }

    const redirectUser=()=>{
        if (redirectUserTo) {
            return <Redirect to='/'/>
        }
    }
    return (
        
        <Layout title='Login' description='Did you know that registered users have more more perks? login to discover.'
        className='container col-md-8 offset-md-2'>
        
        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
        </Layout>
      
    )
}

export default Signin



