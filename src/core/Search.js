import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getCategories,list} from './apiCore'
import Card from './Card'


const Search = () => {

    const [data, setData]=useState({

        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false
    })
 const [error, setError]= useState(false)
    const {categories, category,  search, results,searched}=data

    const loadCategories=()=>{
        getCategories().then(data =>{
            if (data.error) {
               setError(data.error)
            } else {
                setData({...data,categories:data})
            }
        })
    }



    useEffect(()=>{

        loadCategories()
    },[])

    const searchData=()=>{

        if (search) {
            list({search: search || undefined , category})
            .then(response=>{
                if (response.error)
                console.log(response.error)
                else {
                    setData({...data, results:response, searched:true})
                }
            })
        }
    }
    const searchSubmit=(event)=>{
        event.preventDefault()
        searchData()
    }

    const handleChange=name=> event=>{
        setData({...data, [name]:event.target.value, searched:false})
    }
const searchedProduct =(results=[])=>{
    return ( 
        <div className='row'>
            {results.map((product, i)=>{
                <Card key={i} product={product} />
            })}
    </div>
    )
}

    const searchForm=()=>{
        return (
        <form onSubmit={searchSubmit} className='mb-4'>
            <span className='input-group-text  search'>
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className='btn mr-2 select' onChange={handleChange('category')}>
                            <option value='All'>Select Category</option>
                            {categories.map((c, i)=>(<option key={i} value={c._id}>{c.name}</option>))}
                        </select>
                    </div>
                <input type='search' className='form-control' onChange={handleChange('search')} placeholder='Search By Name'/>
                </div>
                <div className='btn input-group-append' style={{border:'none'}}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
           
        </form>
        )
    }
    return (
        <div className='row'>
            <div className='container'>{searchForm()}
          
            </div>
            <div className='container-fluid mb-3'>
                {searchedProduct(results)}
            </div>
        </div>
    )
}

export default Search
