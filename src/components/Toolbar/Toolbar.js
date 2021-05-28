import React from 'react';
import { NavLink } from 'react-router-dom';

import './Toolbar.scss';

import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationIcons from '../NavigationIcons/NavigationIcons';

import logo from '../../assets/icons/logo.png';
import menuIcon from '../../assets/icons/bars_white.png';

const toolbar = (props) => (
  <header className='header'>
    <div className='left-wrapper'>
      <button onClick={props.toggleSideDrawer} className='toggle-side-drawer'>
        <img src={menuIcon} alt='menu button' />
      </button>
      <NavLink to='/'>
        <img className='logo' src={logo} alt='FashionIt' />
      </NavLink>
      <nav className='nav'>
        <NavigationItems {...props} />
      </nav>
    </div>
    <nav className='nav-icons'>
      <NavigationIcons {...props} />
    </nav>
  </header>
);

export default toolbar;
