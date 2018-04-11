import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }

  render() {
    let order = <Spinner />
    if (!this.props.loading) {
      order = (
        <div>
          { this.props.order.map(order => {
            return <Order 
                    key={ order.id }
                    ingredients={ order.ingredients }
                    price={ +order.totalPrice } />
          }) }
        </div>
      );
    }
    return order;
  }
}

const mapToStateToProps = state => {
  return {
    order: state.order.order,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token, userId) => dispatch(actionCreators.fetchOrder(token, userId))
  }
}

export default connect(mapToStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
