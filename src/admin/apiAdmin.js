

const createCategory=(userId, token, category)=>{
    return  fetch(`${process.env.REACT_APP_API_URL}/api/category/create/${userId}`, {
         method:'POST',
         headers:{
             Accept:'application/json',
             'Content-Type':'application/json',
             Authorization:`Bearer ${token}`

         },
         body:JSON.stringify(category)
     })
     .then(response=>{
         return response.json()
     })
     .catch(err=>{
         console.log(err)
     })
 }


 const createProduct=(userId, token, product)=>{
    return  fetch(`${process.env.REACT_APP_API_URL}/api/product/create/${userId}`, {
         method:'POST',
         headers:{
             Accept:'application/json',
             
             Authorization:`Bearer ${token}`

         },
         body:product
     })
     .then(response=>{
         return response.json()
     })
     .catch(err=>{
         console.log(err)
     })
 }

const getCategories=()=>{

    return fetch (`${process.env.REACT_APP_API_URL}/api/category/all`, {
        method:'GET'
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}


const listOrders=(userId, token)=>{

    return fetch (`${process.env.REACT_APP_API_URL}/api/order/list/${userId}`, {
        method:'GET',
        headers:{
            Accept:'application/json',
            
            Authorization:`Bearer ${token}`

        }
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}

const getStatusValue=(userId, token)=>{

    return fetch (`${process.env.REACT_APP_API_URL}/api/order/status-values/${userId}`, {
        method:'GET',
        headers:{
            Accept:'application/json',
            
            Authorization:`Bearer ${token}`

        }
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}

const updateOrderStatus=(userId, token, orderId, status)=>{

    return fetch (`${process.env.REACT_APP_API_URL}/api/order/${orderId}/status/${userId}`, {
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`

        },
        body:JSON.stringify({status, orderId})
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}

const getBikes=()=>{

    return fetch ('${process.env.REACT_APP_API_URL}/api/products?limit=undefined', {
        method:'GET'
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}


const deleteBike=(productId, userId, token)=>{

    return fetch (`${process.env.REACT_APP_API_URL}/api/product/delete/${productId}/${userId}`, {
        method:'DELETE',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`

        },
      
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}

const getABike=(productId)=>{

    return fetch (`${process.env.REACT_APP_API_URL}/api/product/${productId}`, {
        method:'GET'
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}

const updateBike=(productId, userId, token, product)=>{

    return fetch (`${process.env.REACT_APP_API_URL}/api/product/update/${productId}/${userId}`, {
        method:'PUT',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`

        },
        body:product
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}

 module.exports={
     createCategory,
     createProduct,
     getCategories,
     listOrders,
     getStatusValue,
     updateOrderStatus,
     getBikes,
     deleteBike,
     getABike,
     updateBike
     
 }