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
      loading: false,
      purchased: false,
    };
  }

  fetchOrders = () => {
    let newOrder = this.state.orders;
    const uid = localStorage.uid;
    if (uid) {
      db.ref('/users/')
        .child(uid)
        .on('value', (snapshot) => {
          var v = snapshot.val();
          newOrder = {
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
      this.setState({ orders: newOrder }, () => {
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
      orderHistoryObj[String(Date.now())] = {
        items: cart.toString(),
        deliveryFee: delivery,
        totalPrice: totalPrice,
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
