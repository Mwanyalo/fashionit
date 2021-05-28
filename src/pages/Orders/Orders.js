import React, { Component } from 'react';
import './Orders.scss';

import Spinner from '../../shared/Spinner/Spinner';
import Order from './Order/Order';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.uid);
    this.props.isAuthenticated();
    console.log('props', this.props);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      this.props.orders.length === 0
        ? (orders = <p>You do not have any orders yet.</p>)
        : (orders = this.props.orders.map((order) => (
            <Order
              key={order.id}
              products={order.products}
              price={order.price}
            />
          )));
    }

    return (
      <>
        <div className='orders-container'>
          <h2 className='main-title'>Your Orders</h2>
          <p className='main-info'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            eleifend ligula neque, at faucibus metus trum sedru.
          </p>
          <ul className='order-list'>{orders}</ul>
        </div>
      </>
    );
  }
}

export default Orders;
