import React, { Component, createContext } from 'react';
import { db } from '../adapters/firebase';

export const OrderContext = createContext();

class OrderProvider extends Component {
  constructor() {
    super();
    this.state = {
      orders: {
        email: '',
        fullName: '',
        orderHistory: {},
        address: '',
        city: '',
        county: '',
        phone: '',
      },
      orderItems: [],
      loading: false,
      purchased: false,
    };
  }

  fetchOrders = async (id) => {
    let newOrders = this.state.orders;
    let uid = id;
    if (!id) {
      uid = localStorage.uid;
    }
    if (uid) {
      await db
        .ref('/users/')
        .child(uid)
        .on('value', (snapshot) => {
          var v = snapshot.val();
          newOrders = {
            email: v.email,
            fullName: v.fullName,
            address: v.address,
            city: v.city,
            county: v.county,
            phone: v.phone,
            orderHistory: v.orderHistory,
          };
        })
        .bind(this);
      this.setState({ orders: newOrders }, () => {
        return true;
      });
    }
  };

  purchaseOrder = async (data) => {
    const { userId, orderData, totalPrice, delivery, cart } = data;
    if (userId) {
      await this.fetchOrders();
      let orderHistoryObj = this.state.orders.orderHistory;
      if (!orderHistoryObj) orderHistoryObj = {};
      const today = new Date();
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      orderHistoryObj[String(Date.now())] = {
        items: JSON.stringify(cart),
        deliveryFee: delivery,
        totalPrice: totalPrice,
        createdAt: date + ' ' + time,
      };
      let userRef = db.ref('users/');
      userRef.child(userId).update({
        fullName: orderData.fullName,
        email: this.state.orders.email,
        address: orderData.address,
        city: orderData.city,
        county: orderData.county,
        phone: orderData.phone,
        orderHistory: orderHistoryObj,
      });
      this.setState({ purchased: true });
    }
  };

  purchaseInit = () => {
    this.setState({ purchased: false });
  };

  render() {
    return (
      <OrderContext.Provider
        value={{
          ...this.state,
          purchaseOrder: this.purchaseOrder,
          fetchOrders: this.fetchOrders,
          purchaseInit: this.purchaseInit,
        }}
      >
        {this.props.children}
      </OrderContext.Provider>
    );
  }
}

export const Consumer = OrderContext.Consumer;
export const Provider = OrderProvider;
