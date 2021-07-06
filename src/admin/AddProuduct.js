import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createProduct } from './apiAdmin'



const AddProuduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })


    const { user, token } = isAuthenticated()
    //destructure values
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,

        loading,
        error,
        createdProduct,
        redirectToProfil,
        formData } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
    }, [])

    const handleChange = name => event => {

        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        setValues({ ...values, [name]: value })

    }
    const clickSubmit = event => {

        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        createProduct(user._id, token, formData)
                .then(data=>{
                    if (data.error) {
                        setValues({...values, error:data.error})
                    } else {
                        setValues({
                            ...values,
                            name:'',
                            description:'',
                            photo:'',
                            price:'',
                            quantity:'',
                            loading:false,
                            createdProduct:data.name
                        })
                    }
                })
    }
    const productForm = () => {
        return (

            <form className='mb-3' onSubmit={clickSubmit}>
                <h4>Post Photo</h4>
                <div className='form-group'>
                    <label className='btn btn-secondary'>
                        <input type='file' onChange={handleChange('photo')} name='photo' accept='image/*' />
                    </label>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input type='text' className='form-control' onChange={handleChange('name')} value={name} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Description</label>
                    <textarea type='text' className='form-control' onChange={handleChange('description')} value={description} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Price</label>
                    <input type='number' className='form-control' onChange={handleChange('price')} value={price} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Category</label>
                    <select className='form-control' onChange={handleChange('category')} >
                        <option selected>Please Bike Category</option>
                        <option value='60dbba7e3bf66c6c9c3256ef'>Desert Bikes</option>
                    </select>

                </div>
                <div className='form-group'>
                    <label className='text-muted'>Quantity</label>
                    <input type='number' className='form-control' onChange={handleChange('quantity')} value={quantity} />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Shipping</label>
                    <select className='form-control' onChange={handleChange('shipping')} >
                        <option value='0'>No</option>
                        <option value='1'>Yes</option>
                    </select>

                </div>
                <button className='btn btn-outline-dark'>Create Product</button>
            </form>
        )
    }
    return (
        <Layout title='Create New Product' description={`Hello ${user.firstName} ! Ready to Create New Product?`}
            className='container'>

            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {productForm()}
                </div>

            </div>
        </Layout>
    )
}

export default AddProuduct
