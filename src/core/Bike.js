import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {read} from './apiCore'

const Bike = (props) => {

    const [bike, setBike]=useState({})
    const [error, setError]=useState(false)


    const loadingSingleBike=productId=>{

        read(productId).then (data=>{
            if (data.error) {
                setError(data.error)
            }
            else {
               setBike(data)
            }
        })
    }

    useEffect(()=>{

        const productId=props.match.params.productId
        loadingSingleBike(productId)
    },[])
    return (
        <Layout title={bike && bike.name} description={bike && bike.description && bike.description.substring(0,100)}
        className='container'>
           
            <div className='row'>
               {bike && bike.description && <Card product={bike} showViewDetailButton={false}/>}
            </div>
       </Layout>
    )
}

export default Bike
