import React , {useState} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'

import {createCategory} from '../admin/apiAdmin'

const AddCategory = () => {
    const [name, setName]=useState('')
    const [error, setError]=useState(false)
    const [success, setSuccess]=useState(false)


    const {user, token}=isAuthenticated()
    const handleChange=(event)=>{

        setError('')
        setName(event.target.value)
    }

    const clickSubmit=(event)=>{
        event.preventDefault()
        setError('')
        setSuccess(false)

        createCategory(user._id, token, {name})
                    .then(data=>{
                        if (data.error) {
                            setError(true)
                        } else {
                            setError('')
                            setSuccess(true)
                        }
                    })
    }
    const CategoryForm=()=>{

        return ( 
            <form onSubmit={clickSubmit}>
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input className='form-control' type='text'  onChange={handleChange} value={name}
                    autoFocus required/>
                    
                </div>
                <button className='btn btn-outline-dark'>Add Category</button>
            </form>
        )
    }

const showSuccess=()=>{

   
        if (success) {
            return <path className='text-success text-center'>{name} is created</path>
        }
    }

    const showError=()=>{

   
        if (error) {
            return <p className='text-danger text-center'>Sorry but {name} already exists !</p>
        }
    }
    const backToDashboard = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-dark">
                Back to Dashboard ?
            </Link>
        </div>
    );
    return (
        <Layout title='Create New Category' description={`Hello ${user.firstName} ! Ready to Add new Category?`}
         className='container'>

            <div className='row'>
                <div className='col-md-8 offset-md-2'>{showSuccess()}
                {showError()}
                {CategoryForm()}
                {backToDashboard()}
                </div>
            
            </div>
        </Layout>
    )
}

export default AddCategory
