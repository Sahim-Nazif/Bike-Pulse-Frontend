import React, { useState, useEffect } from 'react'
import { getBraintreeClientToken, processPayment } from './apiCore'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './CartHelpers'

const Checkout = ({ products }) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().user.token


    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({ ...data, error: data.error })
            } else {
                setData({ clientToken: data.clientToken })
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])


    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {

            return currentValue + nextValue.count * nextValue.price * 1.3
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to='/signin'>
                <button
                    className='btn btn-info'>Sign in to Checkout
                </button></Link>
        )
    }

    const buy = () => {
        //we will nonce to the backend (server)
        //nonce is the request payment method
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                // console.log(data)
                nonce = data.nonce
                //console.log('send none and total to process:', nonce, getTotal(products))
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)

                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        setData({...data, success:response.success})
                        emptyCart(()=>{
                            console.log('payment success')
                            
                        })

                    })
                    .catch(error => console.log(error))
            }).catch(error => {

                setData({ ...data, error: error.message })
            })
    }
    const showDropIn = () => {
        return (
            <div onBlur={() => setData({ ...data, error: '' })}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn options={{ authorization: data.clientToken }} onInstance={instance => (data.instance = instance)} />
                        <button onClick={buy} className='btn btn-success btn-block'>Pay Now</button>
                    </div>
                ) : null}
            </div>
        )
    }
    const showError = error => {
        return (
            <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        )
    }

    const showSuccess = success => {
        return (
            <div className='alert alert-info' style={{ display: success ? '' : 'none' }}>
                Thanks! Your payment was successful.
            </div>
        )
    }
    return (
        <div>
            <h5 className='text-danger'>Total includes HST: ${getTotal()}</h5>

            {showCheckout()}
            {showError(data.error)}
            {showSuccess(data.success)}

        </div>
    )
}

export default Checkout
