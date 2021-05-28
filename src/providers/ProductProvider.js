import React, { Component, createContext } from 'react';
import { data } from '../data/data';

export const ProductContext = createContext();

class ProductProvider extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      fliteredProducts: [],
      cart: [],
      wishlist: [],
      sortValue: 'relevance',
      detailProduct: {},
      priceTotal: 0,
      delivery: 0,
      orderTotal: 0,
    };
  }

  getProducts = async () => {
    this.setState({ products: data });
  };

  getItemById = (id) => this.state.products.find((item) => item.id === id);

  fliterProducts = async (type) => {
    await this.getProducts();
    let tempProducts = [];
    this.setState({ fliteredProducts: [] });
    const { products } = this.state;
    type === 'female' || type === 'male'
      ? (tempProducts = products.filter((item) => item.gender === type))
      : (tempProducts = products.filter((item) => item.category === type));
    this.setState({ fliteredProducts: tempProducts });
  };

  showDetails = async (id) => {
    await this.getProducts();
    const detailProduct = this.getItemById(Number(id));
    this.setState({ detailProduct: detailProduct });
  };

  addToCart = (id, size) => {
    const updatedList = [...this.state.products];
    const cartItemIndex = updatedList.indexOf(this.getItemById(id));
    const cartItem = updatedList[cartItemIndex];

    cartItem.inCart = true;
    cartItem.amount = 1;
    cartItem.size = size;
    const price = cartItem.price;
    cartItem.total = price;

    const updatedDetailProduct = { ...this.state.detailProduct };
    updatedDetailProduct.inCart = true;
    this.setState({
      cart: [...this.state.cart, cartItem],
      detailProduct: updatedDetailProduct,
    });
  };

  calculateOrder = () => {
    let priceTotal = 0;
    let newCart = this.state.cart;

    newCart.map((item) => (priceTotal += item.total));

    let productAmount = 0;
    newCart.map((item) => (productAmount += item.amount));
    let delivery = 0;
    if (productAmount > 3) delivery = productAmount * 10;
    let orderTotal = priceTotal + delivery;

    this.setState({
      cart: newCart,
      orderTotal: orderTotal,
      delivery: delivery,
      priceTotal: priceTotal,
    });
  };

  handleProductAmount = (id, action) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const incrementedProduct = tempCart[index];

    if (action === 'increment') {
      incrementedProduct.amount = incrementedProduct.amount + 1;
    } else if (action === 'decrement') {
      incrementedProduct.amount = incrementedProduct.amount - 1;
    }
    incrementedProduct.total =
      incrementedProduct.amount * incrementedProduct.price;
    this.setState({ cart: [...tempCart] });
  };

  removeCartItem = (id) => {
    let updatedProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.id !== id);

    const index = updatedProducts.indexOf(this.getItemById(id));
    let removedCartItem = updatedProducts[index];
    removedCartItem.inCart = false;
    removedCartItem.amount = 0;
    removedCartItem.total = 0;
    removedCartItem.size = null;

    this.setState({ products: updatedProducts, cart: [...tempCart] });
  };

  clearCart = (ste, action) => {
    const updatedProductList = [...this.state.products];
    updatedProductList.forEach((product) => {
      product.total = 0;
      product.size = null;
      product.amount = 0;
      product.inCart = false;
    });
    this.setState({ products: updatedProductList, cart: [] });
  };

  addToWishlist = (id) => {
    const updatedList = [...this.state.products];
    const wishlistItemIndex = updatedList.indexOf(this.getItemById(id));
    const wishlistItem = updatedList[wishlistItemIndex];

    wishlistItem.inWishlist = true;

    const updatedDetailProduct = { ...this.state.detailProduct };
    updatedDetailProduct.inWishlist = true;

    this.setState({
      products: updatedList,
      wishlist: [...this.state.wishlist, wishlistItem],
      detailProduct: updatedDetailProduct,
    });
  };

  removeWishlistItem = (id) => {
    let updatedProducts = [...this.state.products];
    let tempWishlist = [...this.state.wishlist];
    tempWishlist = tempWishlist.filter((item) => item.id !== id);

    const index = updatedProducts.indexOf(this.getItemById(id));
    let removedWishlistItem = updatedProducts[index];
    removedWishlistItem.inWishlist = false;

    this.setState({ products: updatedProducts, wishlist: [...tempWishlist] });
  };

  clearWishlist = () => {
    const updatedProductList = [...this.state.products];
    updatedProductList.forEach((product) => {
      product.inWishlist = false;
    });

    this.setState({ products: updatedProductList, wishlist: [] });
  };

  sortProducts = async (sortValue) => {
    const sortedProducts = [...this.state.fliteredProducts];

    this.setState({ sortValue: sortValue }, () => {
      sortedProducts.sort((a, b) => {
        switch (this.state.sortValue) {
          case 'relevance':
            return a['id'] - b['id'];
          case 'price - low to high':
            return a['price'] - b['price'];
          case 'price - high to low':
            return b['price'] - a['price'];
          default:
            return sortedProducts;
        }
      });
      this.setState({ fliteredProducts: sortedProducts });
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          getItemById: this.getItemById,
          fliterProducts: this.fliterProducts,
          showDetails: this.showDetails,
          addToCart: this.addToCart,
          calculateOrder: this.calculateOrder,
          handleProductAmount: this.handleProductAmount,
          removeCartItem: this.removeCartItem,
          clearCart: this.clearCart,
          removeWishlistItem: this.removeWishlistItem,
          clearWishlist: this.clearWishlist,
          addToWishlist: this.addToWishlist,
          sortProducts: this.sortProducts,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export const Consumer = ProductContext.Consumer;
export const Provider = ProductProvider;
