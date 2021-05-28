import React, { Component, createContext } from 'react';
import { data } from '../data/data';

export const InterfaceContext = createContext();

class InterfaceProvider extends Component {
  constructor() {
    super();
    this.state = {
      modalShowed: false,
      showSideDrawer: false,
      modalProduct: {},
      products: [],
    };
  }

  getProducts = async () => {
    this.setState({ products: data });
  };

  getItemById = (id) => this.state.products.find((item) => item.id === id);

  openModal = async (id) => {
    await this.getProducts();
    const product = await this.getItemById(id);

    this.setState({ modalShowed: true, modalProduct: product });
  };

  closeModal = () => {
    this.setState({ modalShowed: false });
  };

  toggleSideDrawer = () => {
    this.setState({ showSideDrawer: !this.state.showSideDrawer });
  };

  render() {
    return (
      <InterfaceContext.Provider
        value={{
          ...this.state,
          getItemById: this.getItemById,
          openModal: this.openModal,
          closeModal: this.closeModal,
          toggleSideDrawer: this.toggleSideDrawer,
        }}
      >
        {this.props.children}
      </InterfaceContext.Provider>
    );
  }
}

export const Consumer = InterfaceContext.Consumer;
export const Provider = InterfaceProvider;
