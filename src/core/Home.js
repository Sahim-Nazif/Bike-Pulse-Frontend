import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'

const Home = () => {

    const [productsBySell, setProductsBySell]=useState([])
    const [productsByArrival, setProductsByArrival]=useState([])
    const [error, setError]= useState(false)


    const loadProductsBySell=()=>{
        getProducts('sold'). then(data =>{
            if (data.error){
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }
    const loadProductsByArrival=()=>{
        getProducts('createdAt'). then(data =>{
            if (data.error){
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(()=>{
        loadProductsByArrival()
        loadProductsBySell()
    },[])
    return (
        <Layout title='Bike Pulse' description='You are in the right place to look for top brand bike'>
        {JSON.stringify(productsBySell)}
        <hr/>
        {JSON.stringify(productsByArrival)}
        </Layout>

    )
}

export default Home
