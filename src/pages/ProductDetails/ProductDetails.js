import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './ProductDetails.scss';
import DetailItem from '../../components/DetailItem/DetailItem';
import Button from '../../shared/Button/Button';
import Modal from '../../shared/Modal/Modal';

class ProductDetails extends Component {
  state = {
    size: '',
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getProductById();
  }

  getProductById = () => {
    const { id } = this.props.match.params;
    this.props.showDetails(id);
  };

  handleChange = (e) => {
    this.setState({
      size: e.target.value,
    });
  };

  handleAddToCart = () => {
    this.state.value === ''
      ? this.props.openModal()
      : this.props.addToCart(this.props.detailProduct.id, this.state.value);
  };

  render() {
    const { detailProduct, modalShowed, closeModal, addToWishlist } =
      this.props;
    const { size } = this.state;

    if (!detailProduct) return <Redirect to='/' />;
    return (
      <>
        <Modal
          modalType='small'
          showModal={modalShowed}
          showBackdrop={modalShowed}
          closeModal={closeModal}
        >
          <p>You must select size.</p>
          <Button clicked={closeModal} btnType='dark'>
            Got it
          </Button>
        </Modal>
        <ul className='details-container'>
          <DetailItem {...this.props}>
            <p className='detail-subtitle'>Select Size:</p>
            <div className='switch-field'>
              <input
                type='radio'
                id='switch_s'
                name='switch_5'
                value='S'
                checked={size === 'S'}
                onChange={this.handleChange}
              />
              <label htmlFor='switch_s'>S</label>
              <input
                type='radio'
                id='switch_m'
                name='switch_5'
                value='M'
                checked={size === 'M'}
                onChange={this.handleChange}
              />
              <label htmlFor='switch_m'>M</label>
              <input
                type='radio'
                id='switch_l'
                name='switch_5'
                value='L'
                checked={size === 'L'}
                onChange={this.handleChange}
              />
              <label htmlFor='switch_l'>L</label>
              <input
                type='radio'
                id='switch_xl'
                name='switch_5'
                value='XL'
                checked={size === 'XL'}
                onChange={this.handleChange}
              />
              <label htmlFor='switch_xl'>XL</label>
              <input
                type='radio'
                id='switch_xxl'
                name='switch_5'
                value='XXL'
                checked={size === 'XXL'}
                onChange={this.handleChange}
              />
              <label htmlFor='switch_xxl'>XXL</label>
            </div>
            <div className='button-wrapper'>
              <Button
                clicked={this.handleAddToCart}
                disabled={detailProduct.inCart ? true : false}
              >
                {detailProduct.inCart ? <p>In Cart</p> : <p>Add to Cart</p>}
              </Button>
              <Button
                clicked={() => addToWishlist(detailProduct.id)}
                disabled={detailProduct.inWishlist ? true : false}
              >
                {detailProduct.inWishlist ? (
                  <p>In Wishlist</p>
                ) : (
                  <p>Add to Wishlist</p>
                )}
              </Button>
            </div>
          </DetailItem>
        </ul>
      </>
    );
  }
}

export default ProductDetails;
