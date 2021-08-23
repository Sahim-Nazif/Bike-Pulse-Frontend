const signup=user=>{
    return  fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
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
    return  fetch(`${process.env.REACT_APP_API_URL}/api/signin`, {
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
        return fetch (`${process.env.REACT_APP_API_URL}/api/signout`, {
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