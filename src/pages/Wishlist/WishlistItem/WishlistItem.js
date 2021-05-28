import React from 'react';
import { Link } from 'react-router-dom';

import './WishlistItem.scss';

import Button from '../../../shared/Button/Button';

const wishlistItem = (props) => {
  const { id, title, subtitle, img, description, price } = props.item;

  return (
    <li className='wishlist-item'>
      <h3 className='wishlist-title'>{title}</h3>
      <p className='wishlist-value'>{subtitle}</p>
      <div className='wishlist-content'>
        <div className='wishlist-img-wrapper'>
          <img src={img} alt='' className='wishlist-item-img' />
        </div>
        <div className='wishlist-info'>
          <h3 className='wishlist-subtitle'>Description:</h3>
          <p className='wishlist-value'>{description}</p>
          <h3 className='wishlist-subtitle'>Price: {price}.00 $</h3>
          <div className='btn-wrapper'>
            <Link to={`/details/${id}`}>
              <Button clicked={() => props.showDetails(id)}>
                Show Details
              </Button>
            </Link>
            <Button clicked={() => props.removeWishlistItem(id)} btnType='dark'>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default wishlistItem;
