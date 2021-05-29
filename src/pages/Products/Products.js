import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Products.scss';

import Product from '../../components/Product/Product';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import Modal from '../../shared/Modal/Modal';
import Button from '../../shared/Button/Button';

class Products extends Component {
  state = {
    sortValue: 'relevance',
  };

  componentDidMount() {
    this.getProducts();
    this.props.isAuthenticated();
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props.match.params;
    const prevType = prevProps.match.params.type;

    if (type !== prevType) {
      this.getProducts();
      this.setState({ sortValue: 'relevance' });
    }
  }

  getProducts = () => {
    const { type } = this.props.match.params;
    this.props.fliterProducts(type);
  };

  handleChange = (e) => {
    this.setState({ sortValue: e.target.value });
    this.props.sortProducts(e.target.value);
  };

  showDetailsByModal = (id) => {
    this.props.showDetails(id);
    this.props.closeModal();
  };

  render() {
    const {
      fliteredProducts,
      openModal,
      showDetails,
      filterProducts,
      modalShowed,
      closeModal,
      modalProduct,
    } = this.props;
    const { title, img, subtitle, price, id } = modalProduct;
    return (
      <>
        <div className='product-container'>
          <Modal
            showModal={modalShowed}
            showBackdrop={modalShowed}
            closeModal={closeModal}
          >
            <button onClick={closeModal} className='close-modal-btn'>
              x
            </button>
            <h3 className='main-title'>{title}</h3>
            <img src={img} alt='' />
            <h3 className='modal-title'>Info:</h3>
            <p className='modal-subtitle'>{subtitle}</p>
            <h3 className='modal-title'>Price: {price}.00 $</h3>
            <h3 className='modal-title'>Sizes: S, M, L, XL, XXL</h3>
            <div className='btn-wrapper'>
              <Link to={`/details/${id}`}>
                <Button clicked={() => this.showDetailsByModal(id)}>
                  Show Details
                </Button>
              </Link>
            </div>
          </Modal>
          <div className='filter-panel'>
            Sort by:
            <select onChange={this.handleChange} value={this.state.sortValue}>
              <option value='relevance'>Relevance</option>
              <option value='price - low to high'>Price - low to high</option>
              <option value='price - high to low'>Price - high to low</option>
            </select>
            <p className='products-amount'>
              Products amount:{' '}
              <span className='amount'>{fliteredProducts.length}</span>
            </p>
          </div>

          <div className='product-list-wrapper'>
            <div className='nav'>
              <SideNavigation filterProducts={filterProducts} />
            </div>
            <ul className='product-list'>
              {fliteredProducts.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  showModal={openModal}
                  showDetails={showDetails}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Products;
