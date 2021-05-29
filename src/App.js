import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import * as ProductContext from './providers/ProductProvider';
import * as InterfaceContext from './providers/InterfaceProvider';
import * as AuthContext from './providers/AuthProvider';
import * as OrderContext from './providers/OrderProvider';

import Layout from './Layout/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Wishlist from './pages/Wishlist/Wishlist';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import Auth from './pages/Auth/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthContext.Provider>
        <AuthContext.Consumer>
          {(auth) => (
            <ProductContext.Provider>
              <ProductContext.Consumer>
                {(productContext) => (
                  <InterfaceContext.Provider>
                    <InterfaceContext.Consumer>
                      {(interfaceContext) => (
                        <OrderContext.Provider>
                          <OrderContext.Consumer>
                            {(orderContext) => (
                              <Layout
                                {...productContext}
                                {...interfaceContext}
                                {...auth}
                              >
                                <Switch>
                                  <Route
                                    path='/auth'
                                    exact
                                    render={(props) => (
                                      <Auth {...props} {...auth} />
                                    )}
                                  />
                                  <Route
                                    path='/'
                                    exact
                                    render={(props) => (
                                      <Home
                                        {...props}
                                        {...orderContext}
                                        {...interfaceContext}
                                        {...auth}
                                      />
                                    )}
                                  />

                                  <Route
                                    path='/browse/:type'
                                    render={(props) => (
                                      <Products
                                        {...props}
                                        {...interfaceContext}
                                        {...productContext}
                                        {...auth}
                                      />
                                    )}
                                  />
                                  <Route
                                    path='/details/:id'
                                    render={(props) => (
                                      <ProductDetails
                                        {...props}
                                        {...interfaceContext}
                                        {...productContext}
                                      />
                                    )}
                                  />
                                  <Route
                                    path='/cart'
                                    render={(props) => (
                                      <Cart
                                        {...props}
                                        {...orderContext}
                                        {...interfaceContext}
                                        {...productContext}
                                        {...auth}
                                      />
                                    )}
                                  />
                                  <Route
                                    path='/wishlist'
                                    render={(props) => (
                                      <Wishlist
                                        {...props}
                                        {...productContext}
                                      />
                                    )}
                                  />
                                  <PrivateRoute
                                    path='/profile'
                                    {...productContext}
                                    {...auth}
                                    {...orderContext}
                                    component={Profile}
                                  />
                                  <Redirect to='/' />
                                </Switch>
                              </Layout>
                            )}
                          </OrderContext.Consumer>
                        </OrderContext.Provider>
                      )}
                    </InterfaceContext.Consumer>
                  </InterfaceContext.Provider>
                )}
              </ProductContext.Consumer>
            </ProductContext.Provider>
          )}
        </AuthContext.Consumer>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
