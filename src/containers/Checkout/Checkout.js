import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummery from '../../components/Order/Checkout/CheckoutSummery';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    let summery = <Redirect to='/' />

    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
      summery = (
        <div>
          {purchaseRedirect}
          <CheckoutSummery
            ingredients={this.props.ings}
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      );
    }

    return summery;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);