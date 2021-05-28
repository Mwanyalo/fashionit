import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideDrawer.scss';
import logo from '../../assets/icons/logo.png';
import closeBtnIcon from '../../assets/icons/arrow_left.png';

import SideNavigation from '../SideNavigation/SideNavigation';
import Backdrop from '../../shared/Backdrop/Backdrop';

const NavigationItem = (props) => (
  <li style={{ alignSelf: 'flex-start' }} className='nav-link-wrapper'>
    <NavLink
      exact={true}
      className={['nav-link', props.linkType].join(' ')}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

const sideDrawer = ({ toggleSideDrawer, showSideDrawer, isAuth }) => {
  let attachedClasses = ['side-drawer', 'close'];
  if (showSideDrawer) {
    attachedClasses = ['side-drawer', 'open'];
  }

  return (
    <>
      <Backdrop show={showSideDrawer} clicked={toggleSideDrawer} />
      <div className={attachedClasses.join(' ')}>
        <div className='logo-wrapper'>
          <img className='logo' src={logo} alt='FashionIt' />
          <button onClick={toggleSideDrawer} className='toggle-side-drawer'>
            <img src={closeBtnIcon} alt='close side drawer' />
          </button>
        </div>
        <div onClick={toggleSideDrawer} className='side-nav-wrapper'>
          <SideNavigation>
            {isAuth ? (
              <NavigationItem linkType={'main'} link='/orders' exact>
                Orders
              </NavigationItem>
            ) : null}
          </SideNavigation>
        </div>
      </div>
    </>
  );
};

export default sideDrawer;
