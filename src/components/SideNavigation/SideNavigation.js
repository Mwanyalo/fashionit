import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavigation.scss';

const NavigationItem = (props) => (
  <li style={{ alignSelf: 'flex-start' }} className='nav-link-wrapper'>
    <NavLink to={props.link} className={['nav-link', props.linkType].join(' ')}>
      {props.children}
    </NavLink>
  </li>
);

const femaleCategories = [
  {
    category: 'female',
    content: 'Women',
    linkType: 'main',
  },
  {
    category: 'women-coats',
    content: 'Coats',
  },
  {
    category: 'women-jackets',
    content: 'Jackets',
  },
  {
    category: 'women-suits',
    content: 'Suits',
  },
  {
    category: 'women-shirts',
    content: 'Shirts',
  },
  {
    category: 'women-t-shirts',
    content: 'T-shirts',
  },
  {
    category: 'women-shoes',
    content: 'Shoes',
  },
  {
    category: 'women-hats',
    content: 'Hats',
  },
  {
    category: 'male',
    content: 'Men',
    linkType: 'main',
  },
  {
    category: 'men-coats',
    content: 'Coats',
  },
  {
    category: 'men-jackets',
    content: 'Jackets',
  },
  {
    category: 'men-suits',
    content: 'Suits',
  },
  {
    category: 'men-shirts',
    content: 'Shirts',
  },
  {
    category: 'men-t-shirts',
    content: 'T-shirts',
  },
  {
    category: 'men-shoes',
    content: 'Shoes',
  },
  {
    category: 'men-hats',
    content: 'Hats',
  },
];

const sideNavigation = ({ filterProducts, children }) => (
  <nav className='side-nav'>
    <ul className='side-nav-list'>
      {femaleCategories.map((femaleCategory) => {
        const { category, linkType, content } = femaleCategory;

        return (
          <NavigationItem
            key={category}
            linkType={linkType}
            link={`/browse/${category}`}
          >
            {content}
          </NavigationItem>
        );
      })}
      {children}
    </ul>
  </nav>
);

export default sideNavigation;
