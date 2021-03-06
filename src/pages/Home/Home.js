import React, { Component } from 'react';
import './Home.scss';

import Modal from '../../shared/Modal/Modal';
import Button from '../../shared/Button/Button';

import saleBg from '../../assets/home_page/Sale.jpg';
import slideOne from '../../assets/home_page/slide_1.jpg';
import slideTwo from '../../assets/home_page/slide_2.jpg';
import slideThree from '../../assets/home_page/slide_3.jpg';
import slideFour from '../../assets/home_page/slide_4.jpg';
import slideFive from '../../assets/home_page/slide_5.jpg';

const slides = [];
slides.push(slideOne, slideTwo, slideThree, slideFour, slideFive);

class Home extends Component {
  componentDidMount() {
    this.props.isAuthenticated();
  }

  closeModal = () => {
    this.props.purchaseInit();
    this.props.closeModal();
  };

  render() {
    return (
      <>
        <Modal
          modalType='small'
          showModal={this.props.purchased}
          showBackdrop={this.props.purchased}
          closeModal={this.closeModal}
        >
          <p>Order completed successfully.</p>
          <Button clicked={this.closeModal} btnType='dark'>
            Got it
          </Button>
        </Modal>
        <div className='home-container'>
          <div className='showcase'>
            <h3 className='main-title'>
              Stylish black and white clothes for every occasion.
            </h3>
            <p className='main-info'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              eleifend ligula neque, at faucibus metus rutrum sed. Fusce
              interdum at est eget aliquet. Suspendisse potenti. Curabitur ac
              luctus magna.
            </p>
          </div>
          <div style={{ backgroundImage: `url(${saleBg})` }} className='sale'>
            <h1 className='title'>Sale</h1>
            <p className='subtitle'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
              dolores hic sint excepturi, omnis minus. Perferendis, velit ut?
              In, voluptas.
            </p>
          </div>
          <div className='slider'>
            {slides.map((slide) => (
              <div
                key={slide}
                style={{ backgroundImage: `url('${slide}')` }}
                className='slide'
              >
                <h3 className='title'>New Collection</h3>
                <h3 className='subtitle'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas, voluptate!
                </h3>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
