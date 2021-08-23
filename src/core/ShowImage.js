import React from 'react'

const ShowImage = ({item, url}) => {
    return (
        <div className='bike-image'>
            <img src={`${process.env.REACT_APP_API_URL}/api/${url}/photo/${item._id}`} alt={item.name} className="mb-3"
            style={{maxHeight:'100%', maxWidth:'100%'}} />            
        </div>
    )
}

export default ShowImage
