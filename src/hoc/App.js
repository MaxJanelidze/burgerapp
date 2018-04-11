import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Logout from '../containers/Auth/Logout/Logout';
import * as actionCreators from '../store/actions/index';
import asyncComponent from './asyncComponent/asyncComponent';

class App extends Component {

  asyncOrders = asyncComponent(() => {
    return import('../containers/Orders/Orders');
  });

  asyncAuth = asyncComponent(() => {
    return import('../containers/Auth/Auth');
  });

  asyncCheckout = asyncComponent(() => {
    return import('../containers/Checkout/Checkout');
  });

  componentDidMount () {
    this.props.onAuthCheckState();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={ this.asyncAuth } />
        <Route path='/' exact component={ BurgerBuilder } />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={ this.asyncCheckout } />
          <Route path='/orders' component={ this.asyncOrders } />
          <Route path='/logout' component={ Logout } />
          <Route path='/auth' component={ this.asyncAuth } />
          <Route path='/' exact component={ BurgerBuilder } />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actionCreators.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
