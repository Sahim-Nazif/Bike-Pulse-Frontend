import React , {useState} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'


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


    }
    const CategoryForm=()=>{

        return ( 
            <form onSubmit={clickSubmit}>
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input className='form-control' type='text'  onChange={handleChange} value={name}
                    autoFocus/>
                    
                </div>
                <button className='btn btn-outline-dark'>Add Category</button>
            </form>
        )
    }

    return (
        <Layout title='Create New Category' description={`Hello ${user.firstName} ! Ready to Add new Category?`}
         className='container'>

            <div className='row'>
                <div className='col-md-8 offset-md-2'>{CategoryForm()}</div>
            </div>
        </Layout>
    )
}

export default AddCategory
