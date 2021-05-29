import React, { Component } from 'react';
import './Profile.scss';

import UserCard from '../../components/UserCard/UserCard';

class Profile extends Component {
  state = {
    orderHistory: [],
  };

  componentDidMount() {
    this.getOrder();
  }

  getOrder = async () => {
    this.props.isAuthenticated();
    await this.props.fetchOrders(this.props.uid);
    this.getOrderDetails();
  };

  getOrderDetails = () => {
    const { orderHistory } = this.props.orders;
    const orders = [];
    if (orderHistory) {
      for (const key in orderHistory) {
        const history = {};
        history.dateTime = orderHistory[key].createdAt;
        history.deliveryFee = orderHistory[key].deliveryFee;
        history.totalPrice = orderHistory[key].totalPrice;
        orders.push(history);
      }
      this.setState({ orderHistory: orders });
    }
  };

  render() {
    const { orders } = this.props;

    return (
      <>
        <div className='profile-container'>
          <h2 className='main-title'>Profile</h2>
          <UserCard {...orders} {...this.state} />
        </div>
      </>
    );
  }
}

export default Profile;
