import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {read, listRelated} from './apiCore'

const Bike = (props) => {

    const [bike, setBike]=useState({})
    const [error, setError]=useState(false)
    const [relatedProduct, setRelatedProduct]=useState([])


    const loadingSingleBike=productId=>{

        read(productId).then (data=>{
            if (data.error) {
                setError(data.error)
            }
            else {
               setBike(data)
               //get related bikes
               listRelated(data._id).then(data=>{
                    if (data.error) {
                        setError(data.error)
                    }else{
                        setRelatedProduct(data)
                    }
               })
            }
        })
    }

    useEffect(()=>{

        const productId=props.match.params.productId
        loadingSingleBike(productId)
    },[props])
    return (
        <Layout title={bike && bike.name} description={bike && bike.description && bike.description.substring(0,100)}
        className='container'>
           
            <div className='row'>
                <div className='col-8'>
                {bike && bike.description && <Card product={bike} showViewDetailButton={false}/>}
                </div>
               <div className='col-4'>
                   <h4>Similar Bikes</h4>
                   {relatedProduct.map((b, i)=>{
                       <div className='mb-3'>
                           <Card key={i} product={b}/>
                       </div>
                   })}
               </div>
            </div>
       </Layout>
    )
}

export default Bike
