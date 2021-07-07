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

 module.exports={
    getProducts,
    getCategories
 }