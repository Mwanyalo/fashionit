import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import './Wishlist.scss';
import WishlistItem from './WishlistItem/WishlistItem';
import Button from '../../shared/Button/Button';

const wishlist = (props) => {
  let list;
  props.wishlist.length === 0
    ? (list = (
        <p
          className='main-info'
          style={{ marginTop: '20px', fontWeight: '500' }}
        >
          You do not have any products on the list yet.
        </p>
      ))
    : (list = (
        <TransitionGroup component='ul' className='wishlist-list'>
          {props.wishlist.map((item) => (
            <CSSTransition key={item.id} classNames='fade' timeout={300}>
              <WishlistItem item={item} {...props} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ));

  return (
    <>
      <div className='wishlist-container'>
        <h2 className='main-title'>Wishlist</h2>
        <p className='main-info'>
          Lorem ipsum dolor adipiscing elit. Donec eleifend ligula neque, at
          faucibus metus trum sedru.
        </p>
        {list}
        {props.wishlist.length > 0 && (
          <Button clicked={props.clearWishlist} btnType='dark'>
            Clear Wishlist
          </Button>
        )}
      </div>
    </>
  );
};

export default wishlist;
