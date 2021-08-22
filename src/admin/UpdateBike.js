import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import {  getABike, updateBike ,getCategories, getBikes } from './apiAdmin'



const UpdateProduct = ({match}) => {

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
        success: false,
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
        success,
        formData } = values;


//load categories and set form data

const init=(productId)=>{
    getABike(productId).then(data =>{
        if (data.error) {
            setValues({...values, error:data.error})
        } else {
            setValues({...values,name:data.name, description:data.description, price:data.price,
                        category:data.category,
                        shipping:data.shipping,
                        quantity:data.quantity,
                        formData:new FormData() })
            initCategories()
        }
    })
}

const initCategories=()=>{
    getCategories().then(data=>{
        if (data.error){
            setValues({...values, error:data.error})
        } else {
            setValues({ categories:data, formData:new FormData()})
        }
    })
}


    useEffect(() => {
       init(match.params.productId)

    }, [])

    const handleChange = name => event => {

        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        setValues({ ...values, [name]: value })

    }
    const clickSubmit = event => {

        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        updateBike(match.params.productId, user._id, token, formData)
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
                            success:true,
                            createdProduct:data.name
                        })
                    }
                })
    }
    const redirectUser=()=>{
        if (success) {
            return <Redirect to='/'/>
        }
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
                    <input type='text' className='form-control' onChange={handleChange('name')} value={name} required />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Description</label>
                    <textarea type='text' className='form-control' onChange={handleChange('description')} value={description} required />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Price</label>
                    <input type='number' className='form-control' onChange={handleChange('price')} value={price} required/>
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Category</label>
                    <select className='form-control' onChange={handleChange('category')} >
                        <option selected>Please Select Bike Category</option>
                        {getCategories && categories.map((c, i)=>(
                                                    <option key={i} value={c._id}>{c.name}
                                                    </option>))}
                    </select>

                </div>
                <div className='form-group'>
                    <label className='text-muted'>Quantity</label>
                    <input type='number' className='form-control' onChange={handleChange('quantity')} value={quantity} required />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Shipping</label>
                    <select className='form-control' onChange={handleChange('shipping')} >
                    <option selected>Please Choose Shipping Option</option>
                            
                        <option value='0'>No</option>
                        <option value='1'>Yes</option>
                    </select>

                </div>
                <button className='btn btn-outline-dark'>Update</button>
            </form>
        )
    }

    const showError=()=>{
        
        if (error) {
            return <p className='text-danger text-center'> Product was not created!</p>
        }
    }
    const showSuccess=()=>(
        <div className='alert alert-info' style={{display:createdProduct ? '': 'none'}}>
            <p>{`${createdProduct} updated successfully !`}</p>
        </div>
    )
    const showLoading=()=>(
       loading && (<div className='alert alert-success'><h3>Loading...</h3></div>)
    )
    return (
        <Layout title='Create New Product' description={`Hello ${user.firstName} ! Ready to Create New Product?`}
            className='container'>

            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                {redirectUser(success)}
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {productForm()}
                   
                </div>

            </div>
        </Layout>
    )
}

export default UpdateProduct
