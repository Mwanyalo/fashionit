import React, { Component } from 'react';
import './UserCard.scss';
import Tabs from '../../shared/Tabs/Tabs';

const Tab = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

class UserCard extends Component {
  renderOrders(props) {
    return (
      <div>
        <table>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Delivery Fee</th>
            <th>Potal Price</th>
          </tr>
          {props.orderHistory?.map((order, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{order?.dateTime}</td>
                <td>{order?.deliveryFee}</td>
                <td>{order?.totalPrice}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }

  renderUserInfo(props) {
    return (
      <div style={{ padding: '20px', height: '30vh', textAlign: 'left' }}>
        <p>
          <b>Full Name:</b> {props?.fullName}
        </p>
        <p>
          <b>Email:</b> {props?.email}
        </p>
        <p>
          <b>Phone Number:</b> {props?.phone}
        </p>
        <p>
          <b>Address:</b> {props?.address}
        </p>
        <p>
          <b>City:</b> {props?.city}
        </p>
        <p>
          <b>County:</b> {props?.county}
        </p>
      </div>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div className='tabs'>
        <Tabs>
          <Tab label='User Information'>
            <div>{this.renderUserInfo(this.props)}</div>
          </Tab>
          <Tab label='Order History'>
            <div>{this.renderOrders(this.props)}</div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default UserCard;
