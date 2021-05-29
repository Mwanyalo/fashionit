import React from 'react';
import './NavigationItems.scss';
import { NavLink } from 'react-router-dom';

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

const navigationItems = ({ uid }) => (
  <ul className='nav-list'>
    <NavigationItem link='/browse/female' exact>
      Women
    </NavigationItem>
    <NavigationItem link='/browse/male' exact>
      Men
    </NavigationItem>
    {uid ? (
      <NavigationItem link='/profile' exact>
        Profile
      </NavigationItem>
    ) : null}
  </ul>
);

export default navigationItems;
