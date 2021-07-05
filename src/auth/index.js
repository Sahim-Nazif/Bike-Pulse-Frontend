const signup=user=>{
    return  fetch(`http://localhost:8000/api/signup`, {
         method:'POST',
         headers:{
             Accept:'application/json',
             'Content-Type':'application/json',

         },
         body:JSON.stringify(user)
     })
     .then(response=>{
         return response.json()
     })
     .catch(err=>{
         console.log(err)
     })
 }

 const signin=user=>{
    return  fetch(`http://localhost:8000/api/signin`, {
         method:'POST',
         headers:{
             Accept:'application/json',
             'Content-Type':'application/json',

         },
         body:JSON.stringify(user)
     })
     .then(response=>{
         return response.json()
     })
     .catch(err=>{
         console.log(err)
     })
 }

const authenticate=(data, next)=>{
    if (typeof window !=='undefined') {

        localStorage.setItem('jwt', JSON.stringify(data))

        next()

    }
}

const signout=(next)=>{

    if (typeof window !=='undefined') {
        localStorage.removeItem('jwt')
        next()
        return fetch (`http://localhost:8000/api/signout`, {
                method:'GET',

        })
        .then(response=>{
            console.log('Signout', response)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

const isAuthenticated=()=>{
    if (typeof window == 'undefined') {
        return false
    }
     if (localStorage.getItem('jwt')){
         return JSON.parse(localStorage.getItem('jwt'))
     }
     else {
         return false
     }
}

 module.exports={
     signup,
     signin,
     authenticate,
     signout,
     isAuthenticated

 }