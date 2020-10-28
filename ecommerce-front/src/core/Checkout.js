import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import {  getBraintreeClientToken, processPayment } from "./apiCore";
import { emptyCart } from "./cartHelpers";
import {  Button, Alert } from "react-bootstrap";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Checkout =({products, setRun = f => f, run = undefined}) => {

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token)
  }, [])


  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(res => {
      if(res.error) {
        setData({...data, error: res.error})
      } else {
        setData({
          ...data,
          clientToken: res.clientToken
        })
      }
    })
  }

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  };

  const showCheckout = () => {
   
    return isAuthenticated() ? (
        <div >
          {showDropIn()}
        </div>
      ) : (
        <Link to="/signin">
          <Button variant="info">
            Sign In to Checkout
          </Button>
        </Link>
      )
    
  }

  const buy = () => {
    // send nonce to server
    // nonce = data.instance.requestPaymentMethod
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(res => {
        // console.log(res)
        nonce = res.nonce
        // once you have nonce, send as paymentMethodNonce
        // console.log("send none and total to process ", nonce, getTotal(products))
        const paymentData= {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        }
        processPayment(userId, token, paymentData)
          .then(response => {
            setData({...data, success: response.success})
            //empty cart
            emptyCart(() => {
              setRun(!run)
              console.log("payment success and empty cart")
            });
            // create order
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        // console.log("drop in error", err)
        setData({...data, error: err.message})
      });

  }

  const showError = (error) => {
    return (
      <Alert 
      variant="danger"
      style= {{ display: error ? "" : "none"}}
      >
        {error}
      </Alert>
    )
  }

  const showSuccess = (success) => {
    return (
      <Alert 
      variant="info"
      style= {{ display: success ? "" : "none"}}
      >
        Thank you! Payment successful.
      </Alert>
    )
  }

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({...data, error: ""})}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn options={{
              authorization: data.clientToken,

            }} onInstance={instance => (data.instance = instance)}
            />
            <Button onClick={buy} variant="success" className="btn-block">
              Buy Now!
            </Button>
          </div>

        ) : null}
      </div>
    )
  }


  return (
    <div>
      <h2> Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}

    </div>
  )
}

export default Checkout;