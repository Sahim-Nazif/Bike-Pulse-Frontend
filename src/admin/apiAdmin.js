

const createCategory=(userId, token, category)=>{
    return  fetch(`http://localhost:8000/api/category/create/${userId}`, {
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
    return  fetch(`http://localhost:8000/api/product/create/${userId}`, {
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

    return fetch ('http://localhost:8000/api/category/all', {
        method:'GET'
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}


const listOrders=(userId, token)=>{

    return fetch (`http://localhost:8000/api/order/list/${userId}`, {
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

    return fetch (`http://localhost:8000/api/order/status-values/${userId}`, {
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

    return fetch (`http://localhost:8000/api/order/${orderId}/status/${userId}`, {
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

    return fetch ('http://localhost:8000/api/products', {
        method:'GET'
    })
        .then(response=>{
            return response.json()
        })
        .catch(err=>console.log(err))
}


const deleteBike=(productId, userId, token)=>{

    return fetch (`http://localhost:8000/api/product/delete/${productId}/${userId}`, {
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

    return fetch (`http://localhost:8000/api/product/${productId}`, {
        method:'GET'
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
     getABike
     
 }