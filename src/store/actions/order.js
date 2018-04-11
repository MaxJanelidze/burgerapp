import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCESS,
    orderData: orderData,
    orderId: id
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(res => {
        console.log(res)
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        console.log(err)
        dispatch(purchaseBurgerFail(err));
      });
  }
}

export const fetchOrderSuccess = (order) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    order: order
  }
}

export const fetchOrderFail = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err
  }
}

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrder = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';    
    axios.get('orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}