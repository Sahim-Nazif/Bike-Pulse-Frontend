const getProducts=(sortBy)=>{

    return fetch (`http://localhost:8000/api/products?/sortBy=${sortBy}&order=desc&limit=6`, {
        method:'GET'
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}

const getCategories=()=>{

    return fetch ('http://localhost:8000/api/category/all', {
        method:'GET'
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}



const getFilteredProducts=(skip, limit, filters={})=>{
    const data={
        limit, skip, filters
    }
    return  fetch(`http://localhost:8000/api/products/by/search`, {
         method:'POST',
         headers:{
             Accept:'application/json',
             'Content-Type':'application/json',
         

         },
         body:JSON.stringify(data)
     })
     .then(response=>{
         return response.json()
     })
     .catch(err=>{
         console.log(err)
     })
 }

 
const list=params=>{

    return fetch ('http://localhost:8000/api/category/all', {
        method:'GET'
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}

 module.exports={
    getProducts,
    getCategories,
    getFilteredProducts
 }