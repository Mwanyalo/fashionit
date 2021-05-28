import React from 'react';
import { NavLink } from 'react-router-dom';

import userIcon from '../../assets/icons/user.png';
import heartIcon from '../../assets/icons/heart_white.png';
import cartIcon from '../../assets/icons/cart_white.png';
import logoutIcon from '../../assets/icons/logout.png';

const NavigationItem = (props) => (
  <li style={{ alignSelf: 'flex-start' }} className='nav-link-wrapper'>
    <NavLink
      onClick={props.logout}
      exact={true}
      className={['nav-link', props.linkType].join(' ')}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

const navigationIcons = ({ cart, uid, logout }) => (
  <ul className='nav-icons-list'>
    <p className='products-amount'>{cart.length}</p>

    {!uid ? (
      <NavigationItem link='/auth' exact>
        <img className='icon' src={userIcon} alt='sign in or sign up' />
      </NavigationItem>
    ) : (
      <NavigationItem logout={logout} link='/' exact>
        <img className='icon' src={logoutIcon} alt='sign in or sign up' />
      </NavigationItem>
    )}
    <NavigationItem link='/wishlist' exact>
      <img className='icon' src={heartIcon} alt='wishlist' />
    </NavigationItem>
    <NavigationItem link='/cart' exact>
      <img className='icon' src={cartIcon} alt='cart' />
    </NavigationItem>
  </ul>
);

export default navigationIcons;
