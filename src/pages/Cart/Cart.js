import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import './Cart.scss';

import Button from '../../shared/Button/Button';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import ContactForm from '../../components/ContactForm/ContactForm';

class Cart extends Component {
  state = {
    orderSummaryAccepted: false,
  };

  componentDidMount() {
    this.props.calculateOrder();
    this.props.isAuthenticated();
  }

  componentDidUpdate(prevProps) {
    const { cart, calculateOrder } = this.props;

    if (cart !== prevProps.cart) {
      calculateOrder();
    }
  }

  acceptOrder = () => {
    if (localStorage.uid) {
      this.setState({
        orderSummaryAccepted: true,
      });
    } else {
      this.props.history.push('/auth');
    }
  };

  render() {
    const { cart, clearCart, uid, purchased } = this.props;

    let selected = (
      <p className='main-info'>
        You select <span className='bold'>{cart.length}</span> products.
      </p>
    );
    if (cart.length === 1)
      selected = (
        <p className='main-info'>
          You select <span className='bold'>1</span> product.
        </p>
      );

    let list;
    cart.length === 0
      ? (list = (
          <p
            className='main-info'
            style={{ marginTop: '20px', fontWeight: '500' }}
          >
            You do not have any products on the list yet.
          </p>
        ))
      : (list = (
          <TransitionGroup component='ul' className='cart-list'>
            {cart.map((item, index) => {
              const { id, img, title, size, price, total, amount } = item;
              const { removeCartItem, handleProductAmount } = this.props;

              return (
                <CSSTransition key={index} classNames='fade' timeout={300}>
                  <li className='cart-item'>
                    <div className='img-wrapper'>
                      <img
                        className='cart-item-img'
                        src={img}
                        alt='product img'
                      />
                    </div>
                    <div className='cart-item-content'>
                      <h3 className='name'>{title}</h3>
                      <p className='value'>Size: {size}</p>
                      <p className='value'>Quantity:</p>
                      <div className='button-wrapper'>
                        <button
                          disabled={amount === 1}
                          onClick={() => handleProductAmount(id, 'decrement')}
                          className='size'
                        >
                          -
                        </button>
                        <span className='size'>{amount}</span>
                        <button
                          onClick={() => handleProductAmount(id, 'increment')}
                          className='size'
                        >
                          +
                        </button>
                      </div>
                      <p className='value'>Price: {price}.00 $</p>
                      <p className='value'>Total: {total}.00 $</p>
                      <Button
                        clicked={() => removeCartItem(id)}
                        btnType='small'
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        ));

    return (
      <>
        <div className='cart-container'>
          <h2 className='main-title'>Shopping Cart</h2>
          {selected}
          {cart.length > 0 && (
            <Button clicked={clearCart} btnType='dark'>
              Clear Cart
            </Button>
          )}
          <div className='content-wrapper'>
            {list}
            <div className='checkout'>
              {cart.length > 0 && (
                <OrderSummary
                  {...this.props}
                  acceptOrder={this.acceptOrder}
                  uid={uid}
                />
              )}
              {cart.length > 0 && this.state.orderSummaryAccepted && (
                <ContactForm {...this.props} />
              )}
            </div>
          </div>
          {purchased && <Redirect to='/' />}
        </div>
      </>
    );
  }
}

export default Cart;
