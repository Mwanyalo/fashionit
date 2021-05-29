import React, { Component } from 'react';
import './ContactForm.scss';

import Button from '../../shared/Button/Button';

class ContactForm extends Component {
  state = {
    fullName: '',
    phone: '',
    address: '',
    city: '',
    county: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  orderHandler = (e) => {
    e.preventDefault();
    const order = {
      cart: this.props.cart,
      totalPrice: this.props.priceTotal,
      orderData: this.state,
      delivery: this.props.delivery,
      userId: this.props.uid,
    };
    this.props.purchaseOrder(order);
  };

  render() {
    const { fullName, phone, address, city, county } = this.state;
    return (
      <>
        <div>
          <form className='contact-form' onSubmit={this.orderHandler}>
            <h3 className='title'>Enter Your Contact Data</h3>
            <div className='form-group'>
              <label htmlFor='username'>Full Name</label>
              <input
                className='form-input'
                type='name'
                name='fullName'
                id='username'
                minLength={3}
                value={fullName}
                required={true}
                onChange={this.handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='phone'>Phone Number</label>
              <input
                className='form-input'
                type='phone'
                name='phone'
                id='phone'
                value={phone}
                required={true}
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address</label>
              <input
                className='form-input'
                type='address'
                name='address'
                id='address'
                value={address}
                required={true}
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='city'>City</label>
              <input
                className='form-input'
                type='text'
                name='city'
                id='city'
                value={city}
                required={true}
                onChange={this.handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='county'>County</label>
              <input
                className='form-input'
                type='county'
                name='county'
                id='county'
                value={county}
                required={true}
                onChange={this.handleChange}
              />
            </div>
            <Button btnType='dark'>Checkout</Button>
          </form>
        </div>
      </>
    );
  }
}

export default ContactForm;
