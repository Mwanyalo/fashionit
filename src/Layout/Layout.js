import React from 'react';
import './Layout.scss';

import Toolbar from '../components/Toolbar/Toolbar';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Footer from '../components/Footer/Footer';

const Layout = (props) => (
  <>
    <Toolbar {...props} />
    <SideDrawer {...props} />
    <main className='main-content'>{props.children}</main>
    <Footer />
  </>
);

export default Layout;
