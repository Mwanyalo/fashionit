import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './DetailItem.scss';

class DetailItem extends Component {
  render() {
    if (this.props.detailProduct === null) return <Redirect to='/' />;

    const { title, subtitle, img, description, price } =
      this.props.detailProduct;

    return (
      <li className='detail-item'>
        <h3 className='detail-title'>{title}</h3>
        <p className='detail-value'>{subtitle}</p>
        <div className='detail-content'>
          <div className='detail-img-wrapper'>
            <img src={img} alt='' className='detail-item-img' />
          </div>
          <div className='detail-info'>
            <h3 className='detail-subtitle'>Description:</h3>
            <p className='detail-value'>{description}</p>
            <h3 className='detail-subtitle'>Price: {price}.00 $</h3>
            {this.props.children}
          </div>
        </div>
      </li>
    );
  }
}

export default DetailItem;
