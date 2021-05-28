import React, { Component } from 'react';
import './OrderSummary.scss';

import Button from '../../../shared/Button/Button';

class OrderSummary extends Component {
  render() {
    const { priceTotal, delivery, orderTotal, acceptOrder, uid } = this.props;
    return (
      <div className='order-summary'>
        <h3 className='title'>Order Summary</h3>
        <p className='info delivery-info'>
          Free delivery below three products.
        </p>
        <div className='wrapper'>
          <p className='subtitle'>Total products price:</p>
          <p className='value'>{priceTotal}.00 $</p>
        </div>
        <div className='wrapper'>
          <p className='subtitle'>Delivery:</p>
          <p className='value'>{delivery}.00 $</p>
        </div>
        <div className='wrapper'>
          <p className='subtitle'>Order total:</p>
          <p className='value'>{orderTotal}.00 $</p>
        </div>
        <Button clicked={acceptOrder} btnType='dark'>
          {uid ? 'To Payment' : 'Sign Up to Order'}
        </Button>
      </div>
    );
  }
}

export default OrderSummary;
